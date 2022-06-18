import React from 'react';
import AboutScreen from './screens/AboutScreen';
import ContactScreen from './screens/ContactScreen';
import AllCourses from './screens/AllCourses';
import CourseScreen from './screens/CourseScreen';
import CourseScreenAuth from './screens/CourseScreenAuth';
import CourseCartScreen from './screens/CourseCartScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import GetStarted from './screens/GetStartedScreen';
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
import NavbarAllcourses from './components/Navbar/NavbarAllcourses';
import UpdateProfile from './components/UpdateProfile';
import Cart from './components/Cart';
import NavbarCart from './components/Navbar/NavbarCart';
import Payment from './components/Payment';
import NavbarUpdateprofile from './components/Navbar/NavbarUpdateprofile';
function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column heightall">
        <AuthProvider>
          <header className="fixed-top h5-small navbars">
            <Routes>
              <Route path="/" element={<NavbarGetStarted />} />
              <Route path="/signin" element={<NavbarSignIn />} />
              <Route path="/signup" element={<NavbarSignup />} />
              <Route
                path="/payment"
                element={
                  <PrivateRoute>
                    <NavbarCart />
                  </PrivateRoute>
                }
              />
              <Route path="/cart" element={<NavbarCart />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <StudentNavbar />
                  </PrivateRoute>
                }
              />
              <Route path="/courses/slug/:slug" element={<NavbarCourse />} />
              <Route
                path="/courses/yours/slug/:slug"
                element={
                  <PrivateRoute>
                    <NavbarCourse />
                  </PrivateRoute>
                }
              />
              <Route
                path="/teacherdashboard"
                element={
                  <PrivateRoute>
                    <TeacherNavbar />
                  </PrivateRoute>
                }
              />
              <Route path="/allcourses" element={<NavbarAllcourses />} />
              <Route
                path="/updateprofile"
                element={
                  <PrivateRoute>
                    <NavbarUpdateprofile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/courses/update/slug/:slug"
                element={<CreateCourseNavbar />}
              />
              <Route
                path="/teach/createnewcourse"
                element={<CreateCourseNavbar />}
              />
              <Route
                path="/courses/yours/slug/:slug"
                element={
                  <PrivateRoute>
                    <NavbarCourse />
                  </PrivateRoute>
                }
              />
              <Route
                path="/courses/cart/slug/:slug"
                element={<NavbarCourse />}
              />
            </Routes>
          </header>
        </AuthProvider>
        <main className="marginsetapp marginbottom">
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
                  element={
                    <PrivateRoute>
                      <UpdateCourse />
                    </PrivateRoute>
                  }
                />
                <Route path="/signin" element={<SignInScreen />} />
                <Route path="/signup" element={<SignUpScreen />} />

                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route
                  path="/payment"
                  element={
                    <PrivateRoute>
                      <Payment />
                    </PrivateRoute>
                  }
                />
                <Route path="/cart" element={<Cart />} />
                <Route
                  path="/updateprofile"
                  element={
                    <PrivateRoute>
                      <UpdateProfile />
                    </PrivateRoute>
                  }
                />
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
                <Route
                  path="/courses/yours/slug/:slug"
                  element={
                    <PrivateRoute>
                      <CourseScreenAuth />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/courses/cart/slug/:slug"
                  element={<CourseCartScreen />}
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
