import { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../store';
import { useNewUserAuth } from './GetUser';
import Rating from './Rating';

function Course(props) {
  const { course } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const navigate = useNavigate();

  const addToCartHandler = () => {
    const existItem = cart.cartItems.find((x) => x._id === course._id);
    const quantity = existItem ? existItem.quantity : 1;
    ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...course, quantity: 1 } });
    navigate('/cart');
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
        <Card.Text>{course.course_instructor}</Card.Text>
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
