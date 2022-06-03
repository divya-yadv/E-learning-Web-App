import { Button, Card, Container, Form, FormGroup } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import GoogleButton from 'react-google-button';
import { useUserAuth } from '../contexts/AuthContext';
import MessageBox from '../components/MessageBox';

function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signin, googleSignIn } = useUserAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await signin(email, password);
      navigate('/home');
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        setError('Wrong Password! please try again!');
      }
      if (error.code === 'auth/user-not-found') {
        setError("User doesn't exist! Create new account");
      }
    }
    setLoading(false);
  }
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate('/home');
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Container className="small-container">
      <div>
        <GoogleButton
          className="g-btn text-center w-100 mb-3"
          type="light"
          onClick={handleGoogleSignIn}
        />
      </div>
      <Card>
        <Card.Body>
          <Helmet>
            <title>Sign In</title>
          </Helmet>

          <h1 className="my-3 text-center mb-4">Sign In with email</h1>
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-3" id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup className="mb-3" id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>
            <Button className="w-100" disabled={loading} type="submit">
              Sign In
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="text-center mt-4">
        <span className="mr-4">Don't have an account?</span>
        <Link className="links ml-2" to="/signup">
          Create one here
        </Link>
      </div>
    </Container>
  );
}
export default SignInScreen;
