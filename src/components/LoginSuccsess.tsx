import { CheckCircle } from '@mui/icons-material'
import { Box } from '@mui/material'
import { useEffect } from 'react'
const LoginSuccsess = () => {
    useEffect(() => {
        setTimeout(() => {
            window.close()
        }, 1000)
    }, [])
    return (
        <Box sx={{ textAlign: "center", alignItems: "center" }}>
            <h2>YOU HAVE SUCCSESSFULY LOED IN!</h2>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CheckCircle color='success' sx={{ fontSize: "100px" }} />
            </Box>
        </Box>
    )
}

export default LoginSuccsess