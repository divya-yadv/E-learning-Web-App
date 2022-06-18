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
    const existItem = cart.cartItems.find((x) => x._id === course._id);
    const quantity = existItem ? existItem.quantity : 1;
    await ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...course, quantity: 1 },
    });
    const newCart = cart.cartItems.map((item) => {
      return item._id;
    });
    if (currentUser) {
      let resu = userInfo.cart.concat(newCart);
      resu = resu.filter((item, index) => {
        return resu.indexOf(item) === index;
      });
      try {
        const result = await axios.post('/api/users/addcartall', {
          email: userInfo.email,
          cart: newCart,
        });
        await ctxDispatch({ type: 'UPDATE_USER', payload: result.data });
        localStorage.setItem('userInfo', JSON.stringify(result.data));
        navigate('/cart');
      } catch (err) {
        getError(err);
      }
    }
  };
  return (
    <Card className="shadow">
      <Link to={`/courses/slug/${course.slug}`}>
        <Card.Img
          className="card-img-top"
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
