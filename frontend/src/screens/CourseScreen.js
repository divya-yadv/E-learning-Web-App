import { useParams } from 'react-router-dom';
function CourseScreen() {
  const params = useParams();
  const { Course_name } = params;
  return <h1>{Course_name}</h1>;
}

export default CourseScreen;
