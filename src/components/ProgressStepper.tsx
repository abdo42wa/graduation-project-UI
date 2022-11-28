import { Button, Step, StepLabel, Stepper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { createPaymentSession } from '../reducers/orderSlice';
import { useAppDispatch, useAppSelector } from '../store';
import PaymentMethod from './PaymentMethod';
import ProductCart from './ProductCart';
import ShippingAddress from './ShippingAddress';

const ProgressStepper = () => {
    const { cart } = useAppSelector((state) => state.cart);
    const { user } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const steps = ['One', 'Tow', 'Three'];
    const stepDescription = [

        { element: <ShippingAddress isCanceledActive={false} firesButtonLabel="Set as default" /> },
        { element: <PaymentMethod /> },
        { element: <ProductCart /> }
    ];

    const [activeStep, setActiveStep] = React.useState(0);


    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };
    const handelCheckOut = () => {
        // @ts-ignore 
        const { email } = user;

        const postObj = {
            cart,
            email
        }
        dispatch(createPaymentSession(postObj));
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((step) => (
                    <Step>
                        <StepLabel>{step}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <>
                <Typography mt={5}>{stepDescription[activeStep]?.element}</Typography>
                <Box display="flex" justifyContent="space-between" pt={6}>
                    <Button variant='contained' disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                    <Button variant='contained' disabled={steps.length - 1 === activeStep} onClick={handleNext}>Nex</Button>
                    <Button variant='contained' color='secondary' onClick={handelCheckOut}>CheckOut</Button>

                </Box>
            </>
        </Box>
    )
}

export default ProgressStepper