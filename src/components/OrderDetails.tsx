import { IOrder } from '../interfaces/IOrder';
import { Button, Dialog, DialogTitle, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Redeem, PrecisionManufacturing, LocalShipping } from '@mui/icons-material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import * as React from 'react';
import { styled } from '@mui/material/styles';


type CartProps = {
    id?: string,
    open: boolean;
    onClose: (value: boolean) => void;
}
const OrderDetails = (props: Pick<IOrder & CartProps, 'id' | 'paymentMethod' | 'shippingAddress' | 'orderItems' | 'onClose' | 'open'>) => {

    const { onClose, open } = props;

    const handleClose = () => {
        onClose(false);
    };


    const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
            top: 22,
        },
        [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                backgroundImage:
                    'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
            },
        },
        [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                backgroundImage:
                    'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
            },
        },
        [`& .${stepConnectorClasses.line}`]: {
            height: 3,
            border: 0,
            backgroundColor:
                theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
            borderRadius: 1,
        },
    }));

    const ColorlibStepIconRoot = styled('div')<{
        ownerState: { completed?: boolean; active?: boolean };
    }>(({ theme, ownerState }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        ...(ownerState.active && {
            backgroundImage:
                'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
            boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        }),
        ...(ownerState.completed && {
            backgroundImage:
                'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        }),
    }));
    function ColorlibStepIcon(props: StepIconProps) {
        const { active, completed, className } = props;

        const icons: { [index: string]: React.ReactElement } = {
            1: <PrecisionManufacturing />,
            2: <LocalShipping />,
            3: <Redeem />,
        };

        return (
            <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
                {icons[String(props.icon)]}
            </ColorlibStepIconRoot>
        );
    }

    const steps = ['Preparing', 'Shipping', 'Ready'];
    return (
        <>
            <Dialog onClose={handleClose} open={open}>
                <Box sx={{ background: "white", p: 3, borderRadius: 3 }}>
                    <DialogTitle>Order Details</DialogTitle>
                    <Box>
                        <Stack spacing={3} direction='column'>
                            <Typography p={2} variant="subtitle1" component="span" >Address</Typography>
                            <p>Address: {props.shippingAddress?.address}</p>
                            <p>City: {props.shippingAddress?.city}</p>
                            <p>Country: {props.shippingAddress?.country}</p>
                            <p>Postal Code: {props.shippingAddress?.postalCode}</p>
                        </Stack>
                        <>


                            <Typography p={2} variant="subtitle1" component="span" >Order items </Typography>
                            {props.orderItems?.map((x) => (
                                <Box key={x._id}>
                                    <p>{x.name}</p>
                                    <img width='250 px' height='250 px' src={x.image} alt={x.name} />
                                    <p>{x.price}</p>
                                    <p>Status: </p>
                                    <Stack sx={{ width: '100%' }} spacing={4}>
                                        {/* @ts-ignore */}
                                        <Stepper alternativeLabel activeStep={steps.indexOf(x.orderStatus!)} connector={<ColorlibConnector />}>
                                            {steps.map((label) => (
                                                <Step key={label}>
                                                    <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                                                </Step>
                                            ))}
                                        </Stepper>
                                    </Stack>
                                </Box>


                            ))}
                        </>
                    </Box>

                    <Box>

                        <Button sx={{ mt: 1, p: 1 }} variant="contained" size="large" fullWidth onClick={handleClose}>Close </Button>
                    </Box>
                </Box>
            </Dialog>
        </>
    )
}

export default OrderDetails