import React from 'react';
import { Button, Card, Form, FormGroup } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import MessageBox from '../components/MessageBox';
import axios from '../components/axios';
import getError from '../utils';
import { useUserAuth } from '../contexts/AuthContext';
import { Store } from '../store';

export default function UpdateProfile() {
  const { currentUser } = useUserAuth();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  const [name, setName] = useState(userInfo.name);
  const [username, setUserName] = useState(userInfo.user_name);
  const [img, setImg] = useState('upload profile pic');
  const [profileURL, setProfileURL] = useState(
    userInfo.image ||
      'https://m.media-amazon.com/images/I/51UW1849rJL._AC_SY450_.jpg'
  );

  const uploadProfileImage = async (event) => {
    const files = event.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'Image_upload');
    data.append('cloud_name', 'educatify-image');
    await fetch(
      'https://api.cloudinary.com/v1_1/educatify-image/image/upload',
      {
        method: 'POST',
        body: data,
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setProfileURL(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function HandleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(false);
      setError('');
      try {
        const res = await axios.post('/api/users/updateuser', {
          email: userInfo.email,
          name: name,
          user_name: username,
          image: profileURL,
        });
        console.log(res);
        ctxDispatch({ type: 'UPDATE_USER', payload: res.data });
      } catch (error) {
        setError(error);
      }
      navigate('/dashboard');
    } catch (error) {
      getError(error);
    }
    setLoading(false);
  }
  return (
    <div className="shadow w-40 m-auto mt-5 p-4 pb-5 ps-2">
      <Card>
        <Card.Body>
          <Helmet>
            <title>Update Profile</title>
          </Helmet>
          <h4 className="my-3 text-center mb-4">Update Account Details </h4>
          {error && <MessageBox variant="danger">{error}</MessageBox>}

          <Form onSubmit={HandleSubmit}>
            <img
              height={200}
              width={200}
              className="m-4"
              id="uploadedimage"
              src={profileURL}
              alt="profile-pic"
            ></img>
            <label
              htmlFor="filePicker"
              className="m-auto"
              style={{
                background: 'rgb(36 58 91)',
                padding: '5px 10px',
                color: 'white',
              }}
            >
              {img}
            </label>

            <input
              className="m-auto thumbnailupload"
              id="filePicker"
              type="file"
              name="thumbnail"
              placeholder="upload profile pic"
              onChange={uploadProfileImage}
            />

            <FormGroup className="mb-3 mt-3" id="name">
              <Form.Label>Enter Name</Form.Label>
              <Form.Control
                type="text"
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
                defaultValue={userInfo.name}
              />
            </FormGroup>
            <FormGroup className="mb-3" id="username">
              <Form.Label>Enter User_Name</Form.Label>
              <Form.Control
                type="text"
                autoComplete="username"
                onChange={(e) => setUserName(e.target.value)}
                defaultValue={userInfo.user_name}
              />
            </FormGroup>
            <Button className="w-100" disabled={loading} type="submit">
              Update
            </Button>
          </Form>
          <div className="text-center mt-5">
            <Button disabled={loading}>
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
