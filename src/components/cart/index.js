import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Cart({ cart, onClose, onRemove, totalPrice }) {
  return (
    <div className="Cart">
      <div className="Cart-container">
        <div className="Cart-header">
          <h2>Корзина</h2>
          <button onClick={onClose}>Закрыть</button>
        </div>
        <div className="Cart-body">
          {cart.length === 0 ? (
            <p>Ваша корзина пуста.</p>
          ) : (
            <ul>
              {cart.map(item => (
                <li key={item.code}>
                  <div className="Main-item-info">
                    <p>{item.code}</p>
                    <p>{item.title}</p>
                  </div>
                  <div className="Secondary-item-info">
                    <p>{item.price} ₽</p>
                    <p>{item.quantity} шт</p>
                  </div>
                  <button onClick={() => onRemove(item.code)}>Удалить</button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="Cart-footer">
          <h3>Итого </h3>
          <h3>{totalPrice} ₽</h3>
        </div>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default Cart;
