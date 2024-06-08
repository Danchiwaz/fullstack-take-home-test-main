import {Box, Grid, Typography} from "@mui/material";
import BookCard from "../components/book-card";
import BooksEmptyState from "../components/books-empty-state";
import { useReadingListStore } from "../state/book.store";

const ReadingListPage = () => {
  const readingList = useReadingListStore((state) => state.readingList);

  return (
    <Box sx={{ marginY: "80px", maxWidth: "1024px", marginX: "auto" }}>

      <Typography className="font-mulish" sx={{fontWeight:"800", fontSize:"24px"}}>Reading List</Typography>
      {/* Books Grid */}
      <Grid container spacing={2} sx={{ marginY: "20px" }}>
        {readingList?.length === 0 ? (
          <BooksEmptyState message={"No book added to reading list yet"} />
        ) : (
          readingList?.map((book, idx) => (
            <Grid key={idx} item md={6} sx={{ width: "100%" }}>
              <BookCard book={book} allowRemove />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default ReadingListPage;
