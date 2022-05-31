import Data from '../data';

function HomeScreen() {
  return (
    <div>
      <h1>Featured Courses</h1>
      <div className="courses">
        {Data.courses.map((course) => {
          return (
            <div className="course" key={course.id}>
              <a href={`/courses/${course.Course_name}`}>
                <img src={course.image} alt={course.Course_name} />
              </a>
              <div className="course-info">
                <a href={`/courses/${course.Course_name}`}>
                  <p>{course.Course_name}</p>
                </a>
                <p>{course.course_instructor}</p>
                <p>
                  <strong>${course.price}</strong>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomeScreen;
