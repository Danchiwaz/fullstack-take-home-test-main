import { Box, TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface BookSearchInputProps{
    searchValue: string;
    onChange: (value: string)=>void;
}
export const BookSearchInput = ({searchValue, onChange}: BookSearchInputProps) => {
  return (
    <Box sx={{ width:"100%", maxWidth: "400px" }}>
      <TextField
        className="font-mulish"
        label="Search by book title"
        sx={{width: "100%"}}
        value={searchValue}
        onChange={e=>onChange(e.target.value)}
      />
    </Box>
  );
};
