import Typography from '@mui/material/Typography';
import { CardMedia, CardContent, Card, Grid, Link } from '@mui/material';

type Product = {
  name: string;
  price: number;
  image: string;
  id: number;
  rating: number;
}
export const ProductCard = (product: Product) => {

  return (
    <Grid item  >
      <Link href={`/product/${product.id}`}>

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
