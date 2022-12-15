import { Button, Dialog, DialogTitle, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState, useEffect } from "react";
import { ICreateProduct } from "../product/ProductType";
import { changeVisibility } from "../reducers/productSlice";
import { useAppDispatch } from "../store";

type ProductVisibility = {
    open: boolean;
    onClose: (value: boolean) => void;
    productID: string,
    isPublished: boolean,
}

const ChangeVisibility = (props: ProductVisibility) => {
    const [isPublished, setIsPublished] = useState<boolean | undefined>(false);
    const { onClose, open } = props;
    const dispatch = useAppDispatch();
    useEffect(() => {
        setIsPublished(props.isPublished)
        console.log(props.isPublished)

    }, [props.isPublished])

    const handleClose = () => {
        onClose(false);
    };

    const handelApplyDiscount = () => {
        const postObj: ICreateProduct = {
            isPublished,
            _id: props.productID
        }
        console.log(postObj)
        dispatch(changeVisibility(postObj))

        onClose(true);
    }

    return (
        <>
            <Dialog onClose={handleClose} open={open}>
                <Box sx={{ background: "white", p: 3, borderRadius: 3 }}>
                    <DialogTitle>Update your product Visibility</DialogTitle>
                    <Box>
                        <Stack spacing={3} direction='row'>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Published it?</InputLabel>
                                <Select
                                    value={isPublished}
                                    labelId="demo-simple-select-label"
                                    label="Published it?"
                                    onChange={(e) => setIsPublished(e.target.value as boolean)}
                                >
                                    <MenuItem value={'true'}>Yes</MenuItem>
                                    <MenuItem value={'false'}>No</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                        <Button sx={{ mt: 4, p: 1 }} variant="contained" size="large" fullWidth onClick={handelApplyDiscount}>Submit </Button>
                    </Box>
                </Box>
            </Dialog>

        </>
    )
}

export default ChangeVisibility