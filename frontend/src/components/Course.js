import React from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../store';
import getError from '../utils';
import Rating from './Rating';
import { useUserAuth } from '../contexts/AuthContext';
function Course(props) {
  const { course } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, cart } = state;
  const navigate = useNavigate();
  const { currentUser } = useUserAuth();

  const addToCartHandler = async () => {
    const res = await ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: course._id,
    });
    try {
      if (currentUser) {
        const newItem = course._id;
        const existItem = userInfo.cart.find((item) => item === newItem);
        const cartItems = existItem
          ? userInfo.cart.map((item) => (item === existItem ? newItem : item))
          : [...userInfo.cart, newItem];
        try {
          const result = await axios.post('/api/users/addcartall', {
            email: userInfo.email,
            cart: cartItems,
          });
          await ctxDispatch({ type: 'UPDATE_USER', payload: result.data });
          localStorage.setItem('userInfo', JSON.stringify(result.data));
        } catch (err) {
          getError(err);
        }
      }
    } catch (err) {
      getError(err);
    }
  };
  return (
    <Card className="shadow">
      <Link to={`/courses/slug/${course.slug}`}>
        <Card.Img
          className="card-img-top imagewidth"
          src={course.thumbnail}
          alt={course.Course_name}
        />
      </Link>
      <Card.Body>
        <Link className="title" to={`/courses/slug/${course.slug}`}>
          <Card.Title>{course.Course_name}</Card.Title>
        </Link>
        <Card.Text>
          By <strong>{course.course_instructor}</strong>
        </Card.Text>
        <Rating rating={course.rating} numReviews={course.numReviews} />
        <Card.Text>
          <strong>${course.price}</strong>
        </Card.Text>
        <Button onClick={addToCartHandler}>Add to cart</Button>
      </Card.Body>
    </Card>
  );
}
export default Course;
