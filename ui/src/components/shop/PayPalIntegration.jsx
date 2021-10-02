/* eslint-disable camelcase */
import React, { useContext } from 'react';
import { PayPalButtons, FUNDING } from '@paypal/react-paypal-js';
import { useHistory } from 'react-router-dom';

import ShopContext from './ShopContext.jsx';

const { VITE_API_ENDPOINT } = import.meta.env;

function PayPalIntegration({ total }) {
  const { cart, emptyCart } = useContext(ShopContext);
  const history = useHistory();

  const handleApprove = async (data, actions) => {
    // const details = await actions.order.capture();

    const { create_time, id, purchase_units } = await actions.order.capture();

    const purchaseInfo = purchase_units[0];
    const order = {
      createTime: create_time,
      transactionId: id,
      type: 'paypal',
      items: cart,
      total: purchaseInfo.amount,
      shipping: {
        address: purchaseInfo.shipping.address,
        name: purchaseInfo.shipping.name.full_name,
      },
    };

    await fetch(`${VITE_API_ENDPOINT}/json/orders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    await emptyCart();
    history.push('/');
  };

  // const handleError = (err) => {
  //   console.error(err);
  // };

  return (
    <PayPalButtons
      fundingSource={FUNDING.PAYPAL}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: total.toString(),
              },
            },
          ],
        });
      }}
      onApprove={handleApprove}
    />
  );
}

export default PayPalIntegration;
