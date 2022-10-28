import { TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"

export const CreateCategory = () => {
  return (
    <Box>
        <Typography variant="h1">Category</Typography>
        <TextField id="standard-basic" label="Category Name" variant="standard"/>
    </Box>
  )
}
