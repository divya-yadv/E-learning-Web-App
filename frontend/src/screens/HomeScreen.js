import { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, courses: action.payload, loading: false };
    case 'FECTH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function HomeScreen() {
  // const [courses, setCourses] = useState([]); // in order to save courses from backend
  const [{ loading, error, courses }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    courses: [],
  }); // current state depends on previous state
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/courses');
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FECTH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []); //empty array coz we gonnna run this function only once after rendering this component
  return (
    <div>
      <h1>Featured Courses</h1>
      <div className="courses">
        {loading ? (
          <div>loading ...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          courses.map((course) => {
            return (
              <div className="course" key={course.id}>
                <Link to={`/courses/${course.Course_name}`}>
                  <img src={course.image} alt={course.Course_name} />
                </Link>
                <div className="course-info">
                  <Link to={`/courses/${course.Course_name}`}>
                    <p>{course.Course_name}</p>
                  </Link>
                  <p>{course.course_instructor}</p>
                  <p>
                    <strong>${course.price}</strong>
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
