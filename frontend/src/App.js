import Data from './data';

function App() {
  return (
    <div>
      <header>
        <a href="/">SmartLearn</a>
      </header>
      <main>
        <h1>Featured Courses</h1>
        <div className="courses">
          {Data.courses.map((course) => {
            return (
              <div className="course" key={course.id}>
                <img src={course.image} alt={course.Course_name} />
                <div className="course-info">
                  <p>{course.Course_name}</p>
                  <p>{course.course_instructor}</p>
                  <p>
                    <strong>${course.price}</strong>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
