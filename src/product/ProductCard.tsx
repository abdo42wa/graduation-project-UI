import { useState } from 'react'
import Typography from '@mui/material/Typography';
import { CardMedia, CardContent, Card, Grid, Link, SpeedDial, Box, SpeedDialAction } from '@mui/material';
import { IProduct } from './ProductType';
import { formatCurrency } from '../utils/formatCurrency';
import { Edit, AttachMoney, Public, MoreVert } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ApplyDiscount from '../components/ApplyDiscount';
import ChangeVisibility from '../components/ChangeVisibility';

type ProductCardProps = {
  isOwner: boolean;
  price: number,
  discount: number,
  isPublished: boolean,
}



export const ProductCard = (product: Pick<IProduct & ProductCardProps, 'image' | 'name' | 'price' | '_id' | 'isOwner' | 'discount' | 'isPublished'>) => {
  const history = useNavigate();
  const [openDiscountForm, setOpenDiscountForm] = useState(false);
  const [openVisibilityForm, setOpenVisibilityForm] = useState(false);
  const actions = [
    { icon: <Edit onClick={() => history(`/edit/product/${product._id}`)} />, name: 'Edit' },
    { icon: <AttachMoney onClick={() => setOpenDiscountForm(true)} />, name: 'Discount' },
    { icon: <Public onClick={() => setOpenVisibilityForm(true)} />, name: 'publish' },
  ];
  const handleClose = (name: any) => {
    name(false);
  };

  return (

    <Grid item  >
      {product.isOwner &&
        <Box sx={{ height: 70, transform: 'translateZ(0px)', flexGrow: 1 }}>
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={<MoreVert />}
            direction="left"
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
              />
            ))}
          </SpeedDial>
        </Box>
      }
      <Link href={`/product/${product._id}`}>
        <Card sx={{ width: 323, height: 453, background: '#eeee', borderRadius: 7 }}>
          <CardMedia
            component="img"
            height="320"
            image={product.image}
            alt={product.name}
          />
          <CardContent>
            <Typography variant="h5" color="text.secondary">
              {product.name}
            </Typography>
            <Typography variant="subtitle1" >{formatCurrency(Number(product.price!))} </Typography>
          </CardContent>
        </Card>
      </Link>
      {openDiscountForm && <ApplyDiscount discount={product.discount!} price={product.price!} open={openDiscountForm} onClose={() => handleClose(setOpenDiscountForm)} productID={product._id!} />}
      {openVisibilityForm && <ChangeVisibility isPublished={product.isPublished!} open={openVisibilityForm} onClose={() => handleClose(setOpenVisibilityForm)} productID={product._id!} />}
    </Grid>
  );
}
