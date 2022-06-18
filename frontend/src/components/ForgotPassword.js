import React from 'react';
import { Button, Card, Form, FormGroup } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUserAuth } from '../contexts/AuthContext';
import MessageBox from '../components/MessageBox';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const { resetPassword } = useUserAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(email);
      setMessage('check your inbox for further instructions');
    } catch (error) {
      setError('Failed to reset password');
    }
    setLoading(false);
  }
  return (
    <div className="shadow w-40 m-auto mt-5 p-4 pb-5">
      <Card>
        <Card.Body>
          <Helmet>
            <title>Password Reset</title>
          </Helmet>

          <h3 className="my-3 text-center mb-4">Enter email</h3>
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          {message && <MessageBox variant="success">{message}</MessageBox>}
          <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-3" id="email">
              <Form.Control
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            <Button className="w-100" disabled={loading} type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="text-center mt-4">
            <Link className="links ml-2" to="/signin">
              Sign in
            </Link>
          </div>
        </Card.Body>
      </Card>
      <div className="text-center mt-4">
        <span className="mr-4">Don't have an account?</span>
        <Link className="links ml-2" to="/signup">
          Create one here
        </Link>
      </div>
    </div>
  );
}
export default ForgotPassword;
