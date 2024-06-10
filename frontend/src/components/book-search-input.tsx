import { Box, TextField } from "@mui/material";

interface BookSearchInputProps {
    searchValue: string;
    onChange: (value: string) => void;
    outlineColor?: string;
    placeholderColor?: string;
    focusedColor?: string;
}

export const BookSearchInput = ({
                                    searchValue,
                                    onChange,
                                    outlineColor = "#335C6E",
                                    placeholderColor = "#335C6E",
                                    focusedColor = "#335C6E",
                                }: BookSearchInputProps) => {
    return (
        <Box sx={{ width: "100%", maxWidth: "400px" }}>
            <TextField
                className="font-mulish MuiInput-colorPrimary MuiFormlabel-colorPrimary"
                label="Search by book title"
                sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: outlineColor, // Outline color
                        },
                        "&:hover fieldset": {
                            borderColor: outlineColor,
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: focusedColor,
                        },
                    },
                    "& .MuiInputLabel-root": {
                        color: placeholderColor, // Placeholder color
                    },
                    "&.Mui-focused .MuiInputLabel-root": {
                        color: focusedColor,
                    },
                }}
                InputProps={{
                    style: { color: focusedColor }, // Text color
                }}
                value={searchValue}
                onChange={(e) => onChange(e.target.value)}
            />
        </Box>
    );
};
