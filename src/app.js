import React, { useState } from 'react';
import Item from './components/item';
import Cart from './components/cart';
import Head from "./components/head";
import CartInfo from "./components/cart-info";

function App({ store }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(cartItem => cartItem.code === item.code);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.code === item.code ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (itemCode) => {
    setCart((prevCart) => prevCart.filter(cartItem => cartItem.code !== itemCode));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="App">
      <Head title="Магазин"/>

      <CartInfo
        itemCount={cart.length}
        totalPrice={totalPrice}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <div className="Catalog">
        {store.state.list.map(item => (
          <Item key={item.code} item={item} onAddToCart={handleAddToCart} />
        ))}
      </div>

      {isCartOpen && (
        <Cart
          cart={cart}
          onClose={() => setIsCartOpen(false)}
          onRemove={handleRemoveFromCart}
          totalPrice={totalPrice}
        />
      )}
    </div>
  );
}

export default App;
