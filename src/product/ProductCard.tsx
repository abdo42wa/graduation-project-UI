import Typography from '@mui/material/Typography';
import {CardMedia, CardContent, Card, Grid, Link } from '@mui/material';

type Product = {
    name: string;
    price: number;
    image: string;
    id: number;
}
export  const ProductCard = (product : Product) => {

  return (
    <Grid item xl={2} lg={4}>
      <Link href={`/product/${product.id}`}>

        <Card sx={{ maxWidth: 317,minHeight:440, pt:2 ,background: '#eeee' }}>
          <CardMedia
            component="img"
            height="300"
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
