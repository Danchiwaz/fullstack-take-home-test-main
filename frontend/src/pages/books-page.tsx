import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBooksQuery } from "../services/books.services";
import { Box, Button, FormControl, Grid, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { BookSearchInput } from "../components/book-search-input";
import BookCard from "../components/book-card";
import { Book } from "../types/book";
import BooksEmptyState from "../components/books-empty-state";
import { useReadingListStore } from "../state/book.store";

const BooksPage = () => {
  const { data, isLoading, isError, error } = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: fetchBooksQuery,
  });

  const [books, setBooks] = useState<Book[]>([]);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const handleLoadMore = () => setPage((prev) => prev + 1);

  const handleOnPerPageChange = (event: SelectChangeEvent) => {
    setPage(1);
    setPerPage(Number(event.target.value));
  };

  const handleSearchChange = (value: string) => {
    setPage(1);
    setSearchValue(value);
  };

  useEffect(() => {
    const filterAndPaginateBooks = () => {
      let filteredBooks = data ?? [];
      if (searchValue) {
        filteredBooks = filteredBooks.filter((book) =>
            book.title?.toLowerCase()?.includes(searchValue.toLowerCase())
        );
      }
      const startIndex = 0;
      const endIndex = page * perPage;
      setBooks(filteredBooks.slice(startIndex, endIndex));
    };

    filterAndPaginateBooks();
  }, [data, perPage, page, searchValue]);

  const readingList = useReadingListStore((state) => state.readingList);

  return (
      <Box sx={{ marginY: "80px", maxWidth: "1024px", marginX: "auto" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <BookSearchInput searchValue={searchValue} onChange={handleSearchChange} />
          <Box sx={{ maxWidth: "150px", minWidth: "150px" }}>
            <FormControl fullWidth>
              <Select
                  sx={{ width: "100%" }}
                  value={String(perPage)}
                  onChange={handleOnPerPageChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
              >
                {[5, 10, 20, 50, 100].map((num) => (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Grid container spacing={2} sx={{ marginY: "20px" }}>
          {isLoading ? (
              <Box sx={{ padding: "20px 2px" }}>
                <Typography className="font-mulish">Loading...</Typography>
              </Box>
          ) : isError ? (
              <Box sx={{ padding: "20px 2px" }}>
                <Typography className="font-mulish">{error?.message}</Typography>
              </Box>
          ) : books.length === 0 ? (
              <BooksEmptyState message={searchValue ? "No book with such title found" : "No books were loaded"} />
          ) : (
              books.map((book, idx) => (
                  <Grid key={idx} item md={6} sx={{ width: "100%" }}>
                    <BookCard book={book} />
                  </Grid>
              ))
          )}
        </Grid>

        {books.length > 0 && books.length < (data?.length ?? 0) && (
            <Box sx={{ display: "flex", justifyContent: "center", margin: "20px" }}>
              <Button
                  variant="outlined"
                  sx={{
                    borderColor: "var(--primary-color)",
                    color: "var(--primary-color)",
                    fontFamily: '"Mulish", "sans-serif"',
                    "&:hover": {
                      background: "var(--primary-color)",
                      color: "var(--light-color)",
                      borderColor: "var(--primary-color)",
                    },
                  }}
                  onClick={handleLoadMore}
              >
                Load More
              </Button>
            </Box>
        )}
      </Box>
  );
};

export default BooksPage;
