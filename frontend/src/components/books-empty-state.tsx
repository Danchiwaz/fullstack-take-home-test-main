import {Box, Typography} from "@mui/material";

interface BooksEmptyStateProps{
    message: string;
}

const BooksEmptyState = ({message}: BooksEmptyStateProps) => {
    return (
        <Box sx={{padding:"50px 10px", display:"flex", alignItems:"center", width:"100%", justifyContent:"center", flexDirection:"column"}}>
            <Typography className="font-mulish errorOrEmptyState">{message}</Typography>

            <Box sx={{width:"150px", height:"150px", padding:"10px", marginTop:"20px" }}>
                <img src="/assets/book_search.svg" style={{width:"100%", height:"100%"}} alt="" />
            </Box>
        </Box>
    )
}

export default BooksEmptyState