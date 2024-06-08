import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBooksQuery } from "../services/books.services";
import Header from "../components/layout/header";
import { Box, Button, FormControl, Grid, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { BookSearchInput } from "../components/book-search-input";
import BookCard from "../components/book-card";
import { Book } from "../types/book";
import BooksEmptyState from "../components/books-empty-state";
import { useReadingListStore } from "../state/book.store";

const  BooksPage = ()=> {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: fetchBooksQuery,
  });

  const [books, setBooks] = useState<Book[]>([]);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const handleLoadMore = ()=>{
    let searchedData = data;

    if(searchValue!== ""){
      searchedData = data?.filter(book=>book.title?.toLowerCase()?.includes(searchValue?.toLowerCase()))
    }
    let maxPage = Math.ceil((searchedData??[]).length / perPage);


    if(page+1>maxPage ) return;

    setPage(prev=>prev+1);
  }

  const handleOnPerPageChange =(event: SelectChangeEvent) => {
    setPage(1);
    setPerPage(Number(event.target.value));
  };

  const handleSearchChange = (value: string)=>{
    setPage(1);
    setSearchValue(value)
  }

  useEffect(()=>{
    let searchedData = data;

    if(searchValue!== ""){
      searchedData = data?.filter(book=>book.title?.toLowerCase()?.includes(searchValue?.toLowerCase()))
    }

    let dataCount = page * perPage;

    let loadedData = searchedData?.slice(0, dataCount);
    setBooks(loadedData ?? [])
  }, [data, perPage, page, searchValue])

  const readingList = useReadingListStore((state) => state.readingList);
  
  return (
      <Box sx={{ marginY: "80px", maxWidth: "1024px", marginX: "auto" }}>

      <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <BookSearchInput searchValue={searchValue} onChange={handleSearchChange} />

        <Box sx={{ maxWidth: "150px", minWidth:"150px" }}>
          <FormControl fullWidth>
            <Select
              sx={{width:"100%"}}
              value={perPage+""}
              onChange={handleOnPerPageChange}
              label="Age"
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
        </Box>

      </Box>

        {/* Books Grid */}
        <Grid container spacing={2} sx={{ marginY: "20px" }}>
          {isLoading ? (
            <Box sx={{ padding: "20px 2px" }}>
              <Typography className="font-mulish">Loading...</Typography>
            </Box>
          ) : isError ? (
            <Box sx={{ padding: "20px 2px" }}>
              <Typography className="font-mulish">{error?.message}</Typography>
            </Box>
          ) : (
            books?.length===0
              ?<BooksEmptyState message={searchValue!==""? "No book with such title found": "No books were loaded"}/>
            :
              books?.map((book, idx) => (
                <Grid key={idx} item md={6} sx={{width:"100%"}}>
                  <BookCard book={book} />
                </Grid>
              ))
          )}
        </Grid>

        {
          books?.length > 0 && books?.length < (data?? [])?.length &&
            <Box sx={{display:"flex", justifyContent:"center", margin:"20px"}}>
              <Button variant="contained" onClick={handleLoadMore}>Load More</Button>
            </Box>
        }
      </Box>
  );
}

export default BooksPage;
