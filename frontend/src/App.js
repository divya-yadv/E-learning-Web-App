import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import CourseScreen from './screens/CourseScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import { AuthProvider, useUserAuth } from './contexts/AuthContext';
import { Container } from 'react-bootstrap';
import Home from './screens/Home';
import Navbarcondition from './components/Navbarcondition';
import ForgotPassword from './components/ForgotPassword';

function App() {
  const { currentUser } = useUserAuth();
  console.log(currentUser);
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <AuthProvider>
          <Navbarcondition />
        </AuthProvider>
        <main>
          <Container>
            <AuthProvider>
              <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/" element={<HomeScreen />} />
                <Route path="/courses/:slug" element={<CourseScreen />} />
                <Route path="/signin" element={<SignInScreen />} />
                <Route path="/signup" element={<SignUpScreen />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
              </Routes>
            </AuthProvider>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
