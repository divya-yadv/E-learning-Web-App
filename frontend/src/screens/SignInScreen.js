import { Button, Card, Container, Form, FormGroup } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import GoogleButton from 'react-google-button';
import { useUserAuth } from '../contexts/AuthContext';
import MessageBox from '../components/MessageBox';
import axios from 'axios';
import { sendEmailVerification } from 'firebase/auth';

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

      const data = await signin(email, password);
      if (data.user.emailVerified === true) {
        try {
          const response = await axios.post('/api/users/signin', {
            email: data.user.email,
          });
        } catch (error) {
          setError(error);
        }
        navigate('/dashboard');
      } else {
        sendEmailVerification(data.user);
        setError('Check your inbox and verify your email first!');
      }
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
      const data = await googleSignIn();
      sendEmailVerification(data.user);
      try {
        const response = await axios.post('/api/users/signin', {
          email: data.user.email,
        });
      } catch (error) {
        setError(error);
      }
      navigate('/dashboard');
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="shadow w-40 m-auto mt-5 p-4 pb-5">
      <Card>
        <Card.Body>
          <Helmet>
            <title>Sign In</title>
          </Helmet>

          <h3 className="text-center my-3 mb-4">Welcome</h3>
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-3" id="email">
              <Form.Label>Enter Email</Form.Label>
              <Form.Control
                type="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup className="mb-3" id="password">
              <Form.Label>Enter Password</Form.Label>
              <Form.Control
                type="password"
                autoComplete="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>
            <Button className="w-100" disabled={loading} type="submit">
              Sign In
            </Button>
          </Form>
          <div className="text-center mt-4">
            <Link className="links ml-2" to="/forgotpassword">
              Forgot password?
            </Link>
          </div>
        </Card.Body>
      </Card>
      <div>
        <GoogleButton
          className="g-btn text-center w-100 mt-3 mb-3"
          type="light"
          onClick={handleGoogleSignIn}
        />
      </div>
      <div className="text-center mt-4">
        <span className="mr-4">Don't have an account?</span>
        <Link className="links ml-2" to="/signup">
          Create one here
        </Link>
      </div>
    </div>
  );
}
export default SignInScreen;
