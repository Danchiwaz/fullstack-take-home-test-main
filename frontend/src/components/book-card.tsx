import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { Book } from "../types/book";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useReadingListStore } from "../state/book.store";
import { toast } from "react-hot-toast";

interface BookCardProps {
  book: Book;
  allowRemove?: boolean;
}
const BookCard = ({ book, allowRemove=false }: BookCardProps) => {
  const readingList = useReadingListStore((state) => state.readingList);
  const addToReadingList = useReadingListStore(
    (state) => state.addToReadingList
  );
  const removeFromReadingList = useReadingListStore(
    (state) => state.removeFromReadingList
  );

  const isInReadingList = !!readingList?.find((book_) => book_.id === book.id);

  const handleAddOrRemove = () => {
      if (isInReadingList){
        if(allowRemove){
            removeFromReadingList(book.id);
            toast.success("Book removed from reading list")
        } else{
            toast.error("Book already in the reading list")
        }

      }
      else {
        addToReadingList(book);
        toast.success("Book added to reading list")
      }
    
  };

  return (
    <Box className="book__card" sx={{ padding: "10px", width: "100%" }}>
      <Box
        sx={{
          background: "var(--dark-color)",
          display: "inline-block",
          color: "white",
          padding: "5px 10px",
          borderRadius: "12px",
          borderBottomLeftRadius: "0px",
        }}
      >
        <Typography className="font-mulish" sx={{ fontSize: "12px" }}>
          Reading Level: {book.readingLevel}
        </Typography>
      </Box>
      <Box
        className="book-card-content"
        sx={{
          marginTop: "10px",
          display: "flex",
          gap: "20px",
          flexDirection: { sm: "row" },
        }}
      >
        <Box
          sx={{
            width: "142px",
            height: "142px",
            borderRadius: "12px",
            overflow: "hidden",
            flexShrink: "0",
          }}
        >
          <img
            style={{ width: "100%", height: "100%" }}
            src={`/${book.coverPhotoURL}`}
            alt={book.title}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            flex: "1",
          }}
        >
          <Typography variant={'h6'} sx={{color:"var(--dark-color)"}} className="font-mulish">{book.title}</Typography>
          <Box
            sx={{
              display: "flex",
              gap: "5px",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "auto",
            }}
          >
            <Box
              className="font-mulish"
              sx={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <Typography
                className="font-mulish"
                sx={{ color: "#000000", fontSize: "12px" }}
              >
                Author:{" "}
              </Typography>
              <Typography
                className="font-mulish"
                sx={{ color: "#7b7b7b", fontSize: "12px" }}
              >
                {book?.author}
              </Typography>
            </Box>
            <Tooltip title={!allowRemove ? "Add to reading list" : "Remove from reading list"}>
              <IconButton onClick={handleAddOrRemove}>
                {
                    allowRemove? isInReadingList ? <DeleteIcon /> : <AddIcon /> : <AddIcon />
                }
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BookCard;
