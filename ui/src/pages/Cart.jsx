import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import ShopContext from '../components/shop/ShopContext.jsx';
import { fixedTwoDecimals } from '../utils/helpers.js';

const SummaryRow = styled(Grid)({
  marginBottom: '1rem',
});

function Cart() {
  const { cart, handleAmountChange, handleRemoveItem } =
    useContext(ShopContext);

  const AMOUNT_MIN = 1;
  const AMOUNT_MAX = 100;
  const subtotal = fixedTwoDecimals(
    cart.reduce((total, item) => {
      const itemTotalPrice = item.price * item.amount;
      const newTotal = total + itemTotalPrice;

      return newTotal;
    }, 0),
  );
  const tax = fixedTwoDecimals((10 / 100) * subtotal);
  const total = fixedTwoDecimals(subtotal + tax);

  // Control amount to never exceed the range (0 > x <= 100).
  // This problem occur when user manually input item amount using keyboard instead of stepper.
  const handleAmountBlur = ({ target: { value } }, productId) => {
    let controlledValue = parseInt(value, 10);

    if (controlledValue < AMOUNT_MIN) controlledValue = AMOUNT_MIN;
    else if (controlledValue > 100) controlledValue = AMOUNT_MAX;

    handleAmountChange(productId, controlledValue);
  };

  const handleCheckout = () => {
    console.log('Subtotal:', subtotal);
    console.log('Tax:', tax);
    console.log('Total:', total);
  };

  const cartItems = cart.map(({ id, name, price, amount }) => (
    <Card elevation={2} key={id} sx={{ ':not(:last-child)': { mb: 2 } }}>
      <CardContent>
        <Typography variant="h6">{name}</Typography>

        <Typography
          color="textSecondary"
          sx={{ fontSize: 'h5.fontSize' }}
        >{`$${fixedTwoDecimals(price * amount)}`}</Typography>

        <TextField
          id="amount"
          label="Amount"
          variant="standard"
          type="number"
          value={amount}
          onChange={(event) =>
            handleAmountChange(id, parseInt(event.target.value, 10))
          }
          onBlur={(event) => handleAmountBlur(event, id)}
          inputProps={{
            min: AMOUNT_MIN,
            max: AMOUNT_MAX,
          }}
        />
      </CardContent>

      <CardActions>
        <Button
          variant="outlined"
          size="small"
          color="error"
          startIcon={<DeleteOutlineIcon />}
          onClick={() => handleRemoveItem(id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  ));

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
          Shopping Cart
        </Typography>

        {cartItems}
      </Grid>

      <Grid item xs={12} md={4}>
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

        <Button size="large" variant="outlined" onClick={handleCheckout}>
          Checkout
        </Button>
      </Grid>
    </Grid>
  );
}

export default Cart;
