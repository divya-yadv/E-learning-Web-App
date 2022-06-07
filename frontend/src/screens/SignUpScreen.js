import { Button, Card, Container, Form, FormGroup } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUserAuth } from '../contexts/AuthContext';
import MessageBox from '../components/MessageBox';
import GoogleButton from 'react-google-button';
import axios from 'axios';

function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { signup, googleSignIn } = useUserAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return setError('Passwords do not match');
    }
    try {
      setError('');
      setLoading(true);
      const res = await signup(email, password);
      try {
        await axios.post('/api/users/signup', {
          email: res.user.email,
          name: name,
          type: 'student',
        });
      } catch (error) {
        setError(error);
      }
      navigate('/signin');
    } catch (error) {
      console.log(error.code);
      if (error.code === 'auth/email-already-in-use') {
        setError('Email already exits! Please Sign In');
      } else {
        setError('creating acccount failed!');
      }
    }
    setLoading(false);
  }
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await googleSignIn();
      console.log(response.user.displayName);
      try {
        await axios.post('/api/users/signup', {
          email: response.user.email,
          name: response.user.displayName,
          type: 'student',
          photoURL: response.user.photoURL,
        });
      } catch (error) {
        setError(error);
      }
      navigate('/studentdashboard');
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
          label="Continue With Google"
          onClick={handleGoogleSignIn}
        />
      </div>
      <Card>
        <Card.Body>
          <Helmet>
            <title>Sign Up</title>
          </Helmet>
          <h4 className="my-3 mb-4">or </h4>
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-3" id="name">
              <Form.Label>Enter Name</Form.Label>
              <Form.Control
                type="text"
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormGroup>
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
            <FormGroup className="mb-3" id="confirm-password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                autoComplete="password"
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />
            </FormGroup>
            <Button className="w-100" disabled={loading} type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="text-center mt-4">
        <span>Already have an account?</span>
        <span className="ms-2">
          <Link className="links" to="/signin">
            Sign In
          </Link>
        </span>
      </div>
    </Container>
  );
}

export default SignUpScreen;
