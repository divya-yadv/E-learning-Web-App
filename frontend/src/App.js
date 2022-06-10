import AboutScreen from './screens/AboutScreen';
import ContactScreen from './screens/ContactScreen';
import AllCourses from './screens/AllCourses';
import CourseScreen from './screens/CourseScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import GetStarted from './screens/GetStartedScreen';
import ProfileScreen from './screens/ProfileScreen';
import Dashboard from './screens/Dashboard';
import TeacherDashboard from './screens/TeacherDashboard';

import NavbarGetStarted from './components/Navbar/NavbarGetStarted';
import NavbarSignup from './components/Navbar/NavbarSignup';
import NavbarSignIn from './components/Navbar/NavbarSignIn';
import StudentNavbar from './components/Navbar/StudentNavbar';
import TeacherNavbar from './components/Navbar/TeacherNavbar';
import ForgotPassword from './components/ForgotPassword';
import Footer from './components/footer';
import NewCourse from './components/Newcourse';

import { AuthProvider } from './contexts/AuthContext';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import CreateCourseNavbar from './components/Navbar/CreateCourseNavbar';
import UpdateCourse from './components/UpdateCourse';
import NavbarCourse from './components/Navbar/NavbarCourse';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column">
        <AuthProvider>
          <header className="fixed-top h5-small navbars">
            <Routes>
              <Route path="/" element={<NavbarGetStarted />} />
              <Route path="/signin" element={<NavbarSignIn />} />
              <Route path="/signup" element={<NavbarSignup />} />
              <Route path="/dashboard" element={<StudentNavbar />} />
              <Route path="/courses/slug/:slug" element={<NavbarCourse />} />
              <Route path="/teacherdashboard" element={<TeacherNavbar />} />
              <Route
                path="/courses/update/slug/:slug"
                element={<CreateCourseNavbar />}
              />
              <Route
                path="/teach/createnewcourse"
                element={<CreateCourseNavbar />}
              />
            </Routes>
          </header>
        </AuthProvider>
        <main className="marginsetapp">
          <Container>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<GetStarted />} />
                <Route path="/about" element={<AboutScreen />} />
                <Route path="/contact" element={<ContactScreen />} />
                <Route path="/allcourses" element={<AllCourses />} />
                <Route path="/courses/slug/:slug" element={<CourseScreen />} />
                <Route
                  path="/courses/update/slug/:slug"
                  element={<UpdateCourse />}
                />
                <Route path="/signin" element={<SignInScreen />} />
                <Route path="/signup" element={<SignUpScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route
                  path="/teach/createnewcourse"
                  element={
                    <PrivateRoute>
                      <NewCourse />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/teacherdashboard"
                  element={
                    <PrivateRoute>
                      <TeacherDashboard />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </AuthProvider>
          </Container>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
