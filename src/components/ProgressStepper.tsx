import { Button, Step, StepLabel, Stepper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState, useEffect } from 'react'
import { IOrder } from '../interfaces/IOrder';
import { IShippingAddress } from '../interfaces/IShippingAddress';
import { createOrder, createPaymentSession } from '../reducers/orderSlice';
import { getUserAddress } from '../reducers/shippingAddressSlice';
import { useAppDispatch, useAppSelector } from '../store';
import PaymentMethod from './PaymentMethod';
import ProductCart from './ProductCart';
import ShippingAddress from './ShippingAddress';
import Spinner from './Spinner'


export const initialData: IShippingAddress = {
    address: "",
    postalCode: "",
    city: "",
    country: "",
}

const ProgressStepper = () => {
    const dispatch = useAppDispatch();
    const { isLodging } = useAppSelector((state) => state.order);
    const { shippingAddress } = useAppSelector((state) => state.shipping);
    const { cart } = useAppSelector((state) => state.cart);

    const { user } = useAppSelector((state) => state.user);
    const steps = ['One', 'Tow', 'Three'];
    const [value, setValue] = useState('Strip');
    // to do move this to septet file 
    const [address, setAddress] = useState(initialData)

    useEffect(() => {
        dispatch(getUserAddress());
        setAddress(
            {
                address: shippingAddress?.address,
                city: shippingAddress?.city,
                postalCode: shippingAddress?.postalCode,
                country: shippingAddress?.country
            })
    }, [dispatch, shippingAddress])



    const updateFields = (fields: Partial<IShippingAddress>) => {
        setAddress(prev => {
            return { ...prev, ...fields }
        })
    }

    const totalPrice = cart.reduce(
        (acc: any, item: any) => acc + item.quantity * item.price,
        0
    );

    const stepDescription = [

        { element: <ShippingAddress {...address} isCanceledActive={false} updateFields={updateFields} /> },
        { element: <PaymentMethod value={value} setValue={setValue} /> },
        { element: <ProductCart /> }
    ];

    const [activeStep, setActiveStep] = useState(0);


    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const onsubmit = (e: any) => {
        e.preventDefault();
        handleNext();
    }
    const handelCheckOut = () => {
        // @ts-ignore 
        const { email } = user;

        const postObj = {
            cart,
            email
        }
        dispatch(createPaymentSession(postObj));

        const orderObj: IOrder = {
            orderItems: cart,
            shippingAddress: address,
            paymentMethod: value,
            totalPrice: totalPrice

        }

        dispatch(createOrder(orderObj));

        !isLodging && localStorage.setItem("cartItems", "")
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box sx={{ width: '100%' }}>
            {isLodging ? (
                <Spinner />
            ) : (
                <form onSubmit={onsubmit}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((step, index) => (
                            <Step key={index}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <>
                        <Typography component="div" pt={5}>{stepDescription[activeStep]?.element}</Typography>
                        <Box display="flex" justifyContent="space-between" pt={6}>
                            <Button variant='contained' disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                            {steps.length - 1 === activeStep ? (
                                <Button variant='contained' color='secondary' onClick={handelCheckOut}>CheckOut</Button>
                            ) : (
                                <Button type='submit' variant='contained' disabled={steps.length - 1 === activeStep} >Nex</Button>
                            )

                            }

                        </Box>
                    </>
                </form>
            )}

        </Box>
    )
}

export default ProgressStepper