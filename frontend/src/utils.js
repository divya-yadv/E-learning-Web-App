import { useEffect, useReducer } from 'react';
import axios from './components/axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, course: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function Getcourse(props) {
  const slug = props;
  const [{ loading, error, course }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    course: {},
  }); // current state depends on previous state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/courses/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        console.log(err);
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);
  return course;
}
function getError(error) {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
}

export default getError;
export { Getcourse };
