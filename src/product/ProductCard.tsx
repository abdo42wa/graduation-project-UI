import Typography from '@mui/material/Typography';
import { CardMedia, CardContent, Card, Grid, Link, SpeedDial, Box, SpeedDialAction } from '@mui/material';
import { IProduct } from './ProductType';
import { formatCurrency } from '../utils/formatCurrency';
import { Edit, AttachMoney, Public, MoreVert } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

type ProductCardProps = {
  isOwner: boolean;
}



export const ProductCard = (product: Pick<IProduct & ProductCardProps, 'image' | 'name' | 'price' | '_id' | 'isOwner'>) => {
  const history = useNavigate();
  const actions = [
    { icon: <Edit onClick={() => history(`/edit/product/${product._id}`)} />, name: 'Edit' },
    { icon: <AttachMoney />, name: 'Discount' },
    { icon: <Public />, name: 'publish' },
  ];

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
    </Grid>
  );
}
