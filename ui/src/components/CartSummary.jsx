import React, { useContext } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

import ShopContext from './shop/ShopContext.jsx';
import { calculatePrice } from '../utils/helpers.js';

const SummaryRow = styled(Grid)({
  marginBottom: '1rem',
});

function CartSummary() {
  const { cart } = useContext(ShopContext);

  const { subtotal, tax, total } = calculatePrice(cart);

  return (
    <>
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Summary
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <SummaryRow container>
          <Grid item xs={6}>
            <Typography variant="body">Subtotal</Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'right' }}>
            <Typography variant="body">${subtotal}</Typography>
          </Grid>
        </SummaryRow>

        <SummaryRow container>
          <Grid item xs={6}>
            <Typography variant="body">Tax</Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'right' }}>
            <Typography variant="body">${tax}</Typography>
          </Grid>
        </SummaryRow>

        <Divider sx={{ mb: '1rem' }} />

        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6">Total</Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'right' }}>
            <Typography variant="h6">${total}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default CartSummary;
