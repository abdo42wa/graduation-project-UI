import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const Spinner = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '40%' }}>
            <CircularProgress />
        </Box>
    )
}

export default Spinner