import { Button, TextField } from '@mui/material'
import { useEffect } from "react"
import { Stack } from '@mui/system'
import { IShippingAddress } from '../interfaces/IShippingAddress';
import { addUserAddress, getUserAddress } from '../reducers/shippingAddressSlice';
import { useAppDispatch } from '../store';


type ShippingAddressProps = {
    onClose?: (value: boolean) => void;
    isCanceledActive: boolean;
    updateFields: (fields: IShippingAddress) => void;
    address?: string;
    postalCode?: string;
    city?: string;
    country?: string;
}


const ShippingAddress = ({ onClose, isCanceledActive, updateFields, address, city, country, postalCode }: ShippingAddressProps) => {

    const dispatch = useAppDispatch();

    const addShippingAddress = () => {
        const postObj: IShippingAddress = {
            address,
            postalCode,
            city,
            country
        }

        dispatch(addUserAddress(postObj))
        onClose?.(false)
    }

    useEffect(() => {
        dispatch(getUserAddress());
    }, [dispatch])

    return (
        <>
            <Stack spacing={2}>
                <TextField value={address} required label="Address" onChange={(e) => updateFields({ address: e.target.value })} />
                <TextField value={postalCode} required label="Postal Code" onChange={(e) => updateFields({ postalCode: e.target.value })} />
                <TextField value={city} required label="City" onChange={(e) => updateFields({ city: e.target.value })} />
                <TextField value={country} required label="Country" onChange={(e) => updateFields({ country: e.target.value })} />
            </Stack>
            <Button onClick={addShippingAddress}>Save</Button>
            {
                isCanceledActive &&
                <Button onClick={() => onClose?.(false)}>Cancel</Button>
            }
        </>


    )
}

export default ShippingAddress