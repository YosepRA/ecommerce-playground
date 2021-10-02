import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ShopContext from '../components/shop/ShopContext.jsx';
import PayPalButton from '../components/shop/PayPalIntegration.jsx';
import CartSummary from '../components/CartSummary.jsx';
import { calculatePrice } from '../utils/helpers.js';

const CheckoutSection = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

function Checkout() {
  const { cart } = useContext(ShopContext);

  const { total } = calculatePrice(cart);

  return (
    <Grid container spacing={2}>
      <CheckoutSection item xs={12} md={8}>
        <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
          Payment Options
        </Typography>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="paypal-control"
            id="paypal-header"
          >
            <Typography>PayPal</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <PayPalButton total={total} />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="credit-card-control"
            id="credit-card-header"
          >
            <Typography>Credit Card</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Coming soon... Kami dake ni.</Typography>
          </AccordionDetails>
        </Accordion>
      </CheckoutSection>

      <Grid item xs={12} md={4}>
        <CartSummary />
      </Grid>
    </Grid>
  );
}

export default Checkout;
