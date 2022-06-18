import React, { useContext } from 'react';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Store } from '../store';

export default function CartIcon() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <Link className="nav-link" to="/cart">
      <i className="fa-solid fa-cart-shopping"></i>
      {cart.length > 0 && (
        <Badge pill bg="danger">
          {cart.length}
        </Badge>
      )}
    </Link>
  );
}
