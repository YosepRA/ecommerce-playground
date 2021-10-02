import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link as RouterLink } from 'react-router-dom';

import ShopContext from '../components/shop/ShopContext.jsx';
import CartSummary from '../components/CartSummary.jsx';
import { fixedTwoDecimals } from '../utils/helpers.js';

function Cart() {
  const { cart, handleAmountChange, handleRemoveItem } =
    useContext(ShopContext);

  const AMOUNT_MIN = 1;
  const AMOUNT_MAX = 100;

  // Control amount to never exceed the range (0 > x <= 100).
  // This problem occur when user manually input item amount using keyboard instead of stepper.
  const handleAmountBlur = ({ target: { value } }, productId) => {
    let controlledValue = parseInt(value, 10);

    // Also prevent empty input.
    if (Number.isNaN(controlledValue) || controlledValue < AMOUNT_MIN) {
      controlledValue = AMOUNT_MIN;
    } else if (controlledValue > 100) {
      controlledValue = AMOUNT_MAX;
    }

    handleAmountChange(productId, controlledValue);
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
        <CartSummary />

        <Button
          component={RouterLink}
          to="/checkout"
          size="large"
          variant="outlined"
          disabled={cart.length < 1}
        >
          Checkout
        </Button>
      </Grid>
    </Grid>
  );
}

export default Cart;
