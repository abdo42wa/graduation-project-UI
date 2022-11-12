import Typography from '@mui/material/Typography';
import { CardMedia, CardContent, Card, Grid, Link } from '@mui/material';
import { Iproduct } from './ProductType';


export const ProductCard = (product: Pick<Iproduct, 'image' | 'name' | 'price' | '_id'>) => {

  return (
    <Grid item  >
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
            <Typography variant="subtitle1" >{product.price} $</Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
}
