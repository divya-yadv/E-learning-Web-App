import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

function Course(props) {
  const { course } = props;
  return (
    <Card>
      <Link to={`/course/${course.slug}`}>
        <Card.Img
          className="card-img-top"
          src={course.image}
          alt={course.Course_name}
        />
      </Link>
      <Card.Body>
        <Link className="title" to={`/course/${course.slug}`}>
          <Card.Title>{course.Course_name}</Card.Title>
        </Link>
        <Card.Text>{course.course_instructor}</Card.Text>
        <Rating rating={course.rating} numReviews={course.numReviews} />
        <Card.Text>
          <strong>${course.price}</strong>
        </Card.Text>
        <Button>Add to cart</Button>
      </Card.Body>
    </Card>
  );
}
export default Course;
