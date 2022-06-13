import { useUserAuth } from '../contexts/AuthContext';
import { Button, Card, Form, FormGroup } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useReducer, useState } from 'react';
import MessageBox from '../components/MessageBox';
import axios from '../components/axios';
import getError from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, user: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function UpdateProfile() {
  const { currentUser, updatepassword } = useUserAuth();

  const [message, setMessage] = useState('');
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();

  const [Error, setError] = useState('');
  const [Loading, setLoading] = useState('');
  let navigate = useNavigate();

  const [{ loading, error, user }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    user: {},
  }); // current state depends on previous state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/users/${currentUser.email}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        console.log(err);
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [currentUser.email]);
  const [name, setName] = useState(user.name);
  const [username, setUserName] = useState(user.user_name);
  async function HandleSubmit(e) {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return setError('Passwords do not match');
    }
    try {
      setLoading(false);
      setError('');
      try {
        if (password) {
          try {
            await updatepassword(password);
          } catch {
            getError('could not reset password!');
            setLoading(false);
          }
        }
        try {
          const res = await axios.post('/api/users/updateuser', {
            name: name,
            user_name: username,
          });
          console.log(res);
        } catch (error) {
          getError(error);
        }
        navigate('/dashboard');
      } catch (error) {
        getError(error);
        setLoading(false);
      }
    } catch (error) {
      getError(error);
      setLoading(false);
    }
  }
  return (
    <div className="shadow w-40 m-auto mt-5 p-4 pb-5">
      <Card>
        <Card.Body>
          <Helmet>
            <title>Update Profie</title>
          </Helmet>
          <h4 className="my-3 text-center mb-4">Update Account Details </h4>
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          {Error && <MessageBox variant="danger">{Error}</MessageBox>}
          {message && <MessageBox variant="danger">{message}</MessageBox>}
          <Form onSubmit={HandleSubmit}>
            <FormGroup className="mb-3" id="name">
              <Form.Label>Enter Name</Form.Label>
              <Form.Control
                type="text"
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
                defaultValue={user.name}
              />
            </FormGroup>
            <FormGroup className="mb-3" id="username">
              <Form.Label>Enter User_Name</Form.Label>
              <Form.Control
                type="text"
                autoComplete="username"
                onChange={(e) => setUserName(e.target.value)}
                defaultValue={user.user_name}
              />
            </FormGroup>
            <FormGroup className="mb-3" id="password">
              <Form.Label>Enter Password</Form.Label>
              <Form.Control
                type="password"
                autoComplete="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep the same"
              />
            </FormGroup>
            <FormGroup className="mb-3" id="confirm-password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                autoComplete="password"
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="Leave blank to keep the same"
              />
            </FormGroup>
            <Button className="w-100" disabled={Loading} type="submit">
              Update
            </Button>
          </Form>
          <div className="text-center mt-5">
            <Button disabled={Loading} type="submit">
              <Link className="text-decoration-none text-white" to="/dashboard">
                Cancel
              </Link>
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
