// src/components/Cart.js

import React, { useState } from 'react';

const Cart = ({ items, onRemoveItem, totalPrice, onCheckout }) => {
  const [checkoutMessage, setCheckoutMessage] = useState('');

  const handleCheckout = () => {
    if (items.length === 0) {
      setCheckoutMessage('Your cart is empty. Please add items to your cart before checking out.');
      return;
    }

    // Logic for checkout can be added here (e.g., API calls, payment processing)
    
    // Set the message indicating successful checkout
    setCheckoutMessage(`Thank you for your purchase! You bought ${items.length} item(s).`);
    
    // Clear the cart after checkout
    onCheckout(); // Call the function to clear the cart
  };

  return (
    <section>
      <h2>Cart</h2>
      {checkoutMessage && <p style={{ color: 'green' }}>{checkoutMessage}</p>} {/* Display checkout message */}
      {items.length === 0 ? (
        <p>Your cart is empty. Please add some items.</p>
      ) : (
        <>
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                {item.name} - ${parseFloat(item.price).toFixed(2)} {/* Format price to 2 decimal places */}
                <button onClick={() => onRemoveItem(index)}>Remove</button>
              </li>
            ))}
          </ul>
          <div>Total Price: ${totalPrice.toFixed(2)}</div>
          <button onClick={handleCheckout}>Checkout</button> {/* Checkout Button */}
        </>
      )}
    </section>
  );
};

export default Cart;