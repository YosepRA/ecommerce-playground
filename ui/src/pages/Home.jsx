import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import ShopContext from '../components/shop/ShopContext.jsx';

function Home() {
  const { products, cart, handleAddItem } = useContext(ShopContext);

  const productCards = products.map((p) => {
    const isAddedToCart = cart.find((item) => item.id === p.id);

    return (
      <Grid item xs={6} md={4} key={p.id}>
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h6">{p.name}</Typography>

            <Typography
              color="textSecondary"
              sx={{ fontSize: 'h5.fontSize' }}
            >{`$${p.price}`}</Typography>
          </CardContent>

          <CardActions>
            <Button
              variant="outlined"
              size="small"
              startIcon={
                isAddedToCart ? (
                  <CheckCircleOutlineIcon />
                ) : (
                  <AddShoppingCartIcon />
                )
              }
              disabled={isAddedToCart}
              onClick={() => handleAddItem(p)}
            >
              {isAddedToCart ? 'Item added' : 'Add to cart'}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  });

  return (
    <>
      <Typography
        variant="h3"
        component="h1"
        sx={{ mt: 3, mb: 6, textAlign: 'center' }}
      >
        D&D Shop
      </Typography>
      <Grid container spacing={2}>
        {productCards}
      </Grid>
    </>
  );
}

export default Home;
