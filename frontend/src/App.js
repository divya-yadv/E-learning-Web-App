import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import CourseScreen from './screens/CourseScreen';
import { Navbar, Container, Figure } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from './assests/Brand.png';
function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar className="fixed-top" bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>
                  <Figure>
                    <Figure.Image
                      width={60}
                      height={50}
                      alt="100x50"
                      src={logo}
                    />
                  </Figure>
                </Navbar.Brand>
              </LinkContainer>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/course/:slug" element={<CourseScreen />} />
            </Routes>
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
