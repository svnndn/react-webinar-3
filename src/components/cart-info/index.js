import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CartInfo({ itemCount, totalPrice, onOpenCart }) {
  return (
    <div className="Cart-info">
      <p>В корзине:</p>
      <p><b>{itemCount} товара / {totalPrice} ₽</b></p>
      <button onClick={onOpenCart}>Перейти</button>
    </div>
  );
}

CartInfo.propTypes = {
  itemCount: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  onOpenCart: PropTypes.func.isRequired,
};

export default CartInfo;
