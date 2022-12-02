import { useState, useEffect } from 'react'
import { Button, Card, CardActions, CardContent, Divider, Grid, TextField, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { useAppDispatch, useAppSelector } from '../store'
import { updateUserProfile } from '../reducers/userSlice'
import { IUser } from '../auth/UserType'
import { getUserAddress } from '../reducers/shippingAddressSlice'
import ShippingAddress from '../components/ShippingAddress'
import { IShippingAddress } from '../interfaces/IShippingAddress'
import { initialData } from '../components/ProgressStepper'



const ProfilePage = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getUserAddress())
    }, [dispatch])


    const [isForm, setIsForm] = useState(false)
    const [name, setName] = useState('')
    const { user } = useAppSelector(state => state.user)
    const { shippingAddress } = useAppSelector(state => state.shipping)



    const [address, setAddress] = useState(initialData)

    const updateFields = (fields: Partial<IShippingAddress>) => {
        setAddress(prev => {
            return { ...prev, ...fields }
        })
    }




    const handelSave = () => {
        const postObj: IUser = {
            name
        }
        dispatch(updateUserProfile(postObj))
    }


    return (
        <Grid container display="flex" justifyContent="center" pt={8} spacing={6}>
            <Grid item md={12}>
                <Typography textAlign="center" variant='h3' component='h1'>Welcome {user?.name}</Typography>
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
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography variant='h5' component='h1'>
                            Address information
                        </Typography>

                        <Box display="flex" justifyContent="space-between" mt={3} mb={3}>
                            {!isForm ? (
                                <>
                                    {!shippingAddress?.address ? (
                                        <>
                                            <Typography>No date</Typography>
                                            <Button onClick={(e) => setIsForm(true)}>Add</Button>
                                        </>
                                    ) : (
                                        <Box>
                                            <Box>
                                                <Typography sx={{ mb: 1.5 }} color="text.secondary"> Address</Typography>
                                                <Typography>{shippingAddress?.address}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography sx={{ mb: 1.5 }} color="text.secondary"> City</Typography>
                                                <Typography>{shippingAddress?.city}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography sx={{ mb: 1.5 }} color="text.secondary"> Postal Code</Typography>
                                                <Typography>{shippingAddress?.postalCode}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography sx={{ mb: 1.5 }} color="text.secondary"> Country</Typography>
                                                <Typography>{shippingAddress?.country}</Typography>
                                            </Box>


                                            <Button size="small" onClick={(e) => setIsForm(true)}>Edit</Button>

                                        </Box>
                                    )}
                                </>
                            ) : (
                                <Box>
                                    <ShippingAddress {...address} updateFields={updateFields} isCanceledActive={true} onClose={() => setIsForm(false)} />
                                </Box>
                            )}
                        </Box>
                        <Divider />
                    </CardContent>
                    <CardActions>

                    </CardActions>
                </Card>

            </Grid>
        </Grid >
    )
}

export default ProfilePage