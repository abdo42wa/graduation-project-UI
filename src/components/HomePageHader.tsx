import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { ArrowForwardIosOutlined } from '@mui/icons-material'
import { getUser } from "../reducers/userSlice";
import { useAppDispatch } from "../store";
const logo = require("../Images/Image.png");

const HomePageHader = () => {
    const dispatch = useAppDispatch();
    const test = () => {
        dispatch(getUser())
    }
    return (
        <>
            <Card sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', background: 'radial-gradient(79.46% 242.65% at 75.89% -73.02%, #121212 0%, #121212 65.67%, #1D1528 77.21%, #8E313C 91.43%, #E9753D 100%)', color: "white" }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Box display="flex" justifyContent="center" flexDirection="column" mt={6}>
                            <Typography component="div" variant="h1">
                                Little  Planet
                            </Typography>
                            <Typography variant="subtitle1" component="div" sx={{ width: ["100%", "90%", "80%", "70%", "60%"] }}>
                                <Typography pt={3} variant="body2" fontSize='1.25rem'>
                                    We offer an easy prepaid subscription for your phone and fast, prepaid mobile Internet.
                                    Top up conveniently online and with the mobile application.</Typography>
                            </Typography>
                            <Button onClick={test} sx={{ color: "white", bgcolor: "#D32F2F", mt: 4, p: 2, width: ["100%", "90%", "80%", "70%", "35%"] }} endIcon={<ArrowForwardIosOutlined sx={{ ml: 5 }} />} >Start Now</Button>
                        </Box>
                    </CardContent>
                </Box>
                <CardMedia
                    component="img"
                    sx={{}}
                    image={logo}
                    alt="Live from space album cover"
                />
            </Card >
        </>
    )
}

export default HomePageHader