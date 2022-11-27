import { Button, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import { useState } from 'react'
import { IShippingAddress } from '../interfaces/IShippingAddress';
import { addUserAddress } from '../reducers/shippingAddressSlice';
import { useAppDispatch } from '../store';


type ShippingAddressProps = {
    onClose?: (value: boolean) => void;
    firesButtonLabel: string;
    isCanceledActive: boolean;
}

const ShippingAddress = (props: ShippingAddressProps) => {
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const dispatch = useAppDispatch();
    const addShippingAddress = () => {
        const postObj: IShippingAddress = {
            address,
            postalCode,
            city,
            country
        }

        dispatch(addUserAddress(postObj))
    }

    return (
        <>
            <Stack spacing={2}>
                <TextField value={address} required label="Address" onChange={(e) => setAddress(e.target.value)} />
                <TextField value={postalCode} required label="Postal Code" onChange={(e) => setPostalCode(e.target.value)} />
                <TextField value={city} required label="City" onChange={(e) => setCity(e.target.value)} />
                <TextField value={country} required label="Country" onChange={(e) => setCountry(e.target.value)} />
            </Stack>
            <Button onClick={addShippingAddress}>{props.firesButtonLabel}</Button>
            {
                props.isCanceledActive &&
                <Button onClick={() => props.onClose?.(false)}>Cancel</Button>
            }
        </>


    )
}

export default ShippingAddress