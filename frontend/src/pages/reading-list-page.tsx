import {Box, Button, Grid, Typography} from "@mui/material";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import BookCard from "../components/book-card";
import BooksEmptyState from "../components/books-empty-state";
import { useReadingListStore } from "../state/book.store";
import {Link} from "react-router-dom";

const ReadingListPage = () => {
  const readingList = useReadingListStore((state) => state.readingList);

  return (
    <Box sx={{ marginY: "80px", maxWidth: "1024px", marginX: "auto" }}>
            <Typography className="font-mulish" sx={{ fontWeight: "800", fontSize: "24px" }}>
                Reading List
            </Typography>
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
        <Link to="/" style={{ textDecoration: "none", fontWeight: "bold", color: "inherit" }}>
            <Button
                sx={{
                    borderColor: "var(--primary-color)",
                    color: "var(--primary-color)",
                    "&:hover": {
                        background: "var(--primary-color)",
                        color: "var(--light-color)",
                        borderColor: "var(--primary-color)",
                    },
                }}
                variant="outlined"
            >
                <ArrowLeftIcon />
                Go Back
            </Button>
        </Link>
    </Box>
  );
};

export default ReadingListPage;
