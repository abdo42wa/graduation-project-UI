import { useState } from 'react'
import { Button, Card, CardActions, CardContent, Divider, Grid, TextField, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { useAppDispatch, useAppSelector } from '../store'
import { updateUserProfile } from '../reducers/userSlice'
import { IUser } from '../auth/UserType'

const ProfilePage = () => {
    const [isForm, setIsForm] = useState(false)
    const [name, setName] = useState('')
    const { user } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch();
    const handelSave = () => {

        const postObj: IUser = {
            name
        }


        dispatch(updateUserProfile(postObj))
    }

    return (
        <Grid container display="flex" justifyContent="center" pt={8} spacing={6}>
            <Grid item md={12}>
                <Typography textAlign="center" variant='h3' component='h1'>Welcom {user?.name}</Typography>
            </Grid>

            <Grid item md={5}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography variant='h5' component='h1'>
                            Your personal information
                        </Typography>

                        <Box display="flex" justifyContent="space-between" mt={3} mb={3}>
                            {!isForm ? (
                                <>
                                    <Box>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary"> Username</Typography>
                                        <Typography>{user?.name}</Typography>
                                    </Box>

                                    <Button size="small" onClick={(e) => setIsForm(true)}>Edit</Button>
                                </>
                            ) : (
                                <>
                                    <TextField value={name} required label="Username" onChange={(e) => setName(e.target.value)} />
                                    <Stack direction="row" spacing={3}>
                                        <Button onClick={handelSave}>Save</Button>
                                        <Button onClick={(e) => setIsForm(false)}>Cancel</Button>
                                    </Stack>
                                </>
                            )}
                        </Box>
                        <Divider />
                    </CardContent>
                    <CardActions>

                    </CardActions>
                </Card>
                {/* <Typography textAlign="center" variant='h5' component='h1'>  Your personal information</Typography>
                <Stack spacing={3} mt={4}>
                    Edit
                    <TextField value={user?.name} required label="Username" disabled />
                    <TextField value={user?.email} required label="Email" disabled />
                    <TextField required label="Password" disabled />
                    <TextField required label="Current Password" disabled type="password" />
                    <TextField required label="New Password" disabled type="password" />
                </Stack> */}

            </Grid>

            <Grid item md={4}>
                Personal info

            </Grid>
        </Grid >
    )
}

export default ProfilePage