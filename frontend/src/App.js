import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import CourseScreen from './screens/CourseScreen';
function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Link to="/">SmartLearn</Link>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/courses/:Course_name" element={<CourseScreen />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
