import React, { useContext, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
} from 'react-bootstrap';
import { useUserAuth } from '../contexts/AuthContext';
import MessageBox from '../components/MessageBox';
import axios from './axios';
import { useNavigate } from 'react-router-dom';
import { Store } from '../store';

export default function NewCourse() {
  const [coursename, setCoursename] = useState('');
  const [instructorname, setinstructorname] = useState('');
  const [coursedesc, setCoursedesc] = useState('');
  const [keyword, setKeyword] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [requirement, setRequirement] = useState('');
  const [requirements, setrequirements] = useState([]);
  const [price, setPrice] = useState(0);
  const [link, setLink] = useState('');
  const [sectionTitle, setTitle] = useState('');
  const [sections, setSections] = useState([]);
  const { currentUser } = useUserAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState('upload thumbnail');
  const [thumbnailURL, setThumbnailURL] = useState(
    'https://m.media-amazon.com/images/I/51UW1849rJL._AC_SY450_.jpg'
  );
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, cart } = state;
  const navigate = useNavigate();
  const uploadThumbnail = async (event) => {
    var filename = event.target.value.replace(/^.*(\\|\/|\:)/, '');
    setImg(filename);
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
        setThumbnailURL(data.secure_url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      try {
        const res = await axios.post('/teach/api/users/addcourse', {
          email: currentUser.email,
          title: coursename,
          instructor: instructorname,
          coursedescrip: coursedesc,
          keywords: keywords,
          requirement: requirements,
          courseprice: price,
          sections: sections,
          thumbnail: thumbnailURL,
        });
        await ctxDispatch({ type: 'UPDATE_USER', payload: res.data });
        localStorage.setItem('userInfo', JSON.stringify(res.data));
        navigate('/teacherdashboard');
      } catch (error) {
        setError(error);
      }
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  }

  function HandleRequirementAdd() {
    setrequirements((prevValue) => {
      return [...prevValue, requirement];
    });
    setRequirement('');
  }
  function HandleKeywordAdd() {
    setKeywords((prevValue) => {
      return [...prevValue, keyword];
    });
    setKeyword('');
  }
  function HandleSectionAdd() {
    setSections((prevValue) => {
      return [...prevValue, { title: sectionTitle, link: link }];
    });
    setTitle('');
    setLink('');
  }
  function deleteHandlekeywords(target) {
    const items = keywords.filter((item) => item !== target);
    return setKeywords(items);
  }
  function deleteHandlereq(target) {
    const items = requirements.filter((item) => item !== target);
    return setrequirements(items);
  }
  function deleteHandlesections(target) {
    const items = sections.filter((item) => item !== target);
    return setSections(items);
  }
  return (
    <Container className="teacherdashboard w-100 text-center">
      <h1 className="text-start sm-3">Course details</h1>

      <Button
        disabled={loading}
        type="submit"
        onClick={handleSubmit}
        className="btn btn-danger uploadbutton"
      >
        Upload
      </Button>
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      <Container className="pt-4">
        <Form>
          <Row>
            <Col sm={12} md={3} lg={3} className="shadow newcourse">
              <Card>
                <Card.Title>Basic details</Card.Title>
                <img
                  className="m-4"
                  id="uploadedimage"
                  src={thumbnailURL}
                  alt="thumbnail"
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
                <button
                  type="button"
                  onClick={() => {
                    setImg('upload thumbnail');
                    setThumbnailURL(
                      'https://m.media-amazon.com/images/I/51UW1849rJL._AC_SY450_.jpg'
                    );
                  }}
                  className="btn btn-danger m-auto mt-3"
                >
                  remove
                </button>
                <input
                  className="m-auto thumbnailupload"
                  id="filePicker"
                  type="file"
                  name="thumbnail"
                  placeholder="upload thumbnail"
                  onChange={uploadThumbnail}
                />

                <FormGroup className="mt-4 mb-4" id="coursename">
                  <Form.Control
                    className="inputoutlines"
                    type="text"
                    autoComplete="name"
                    onChange={(e) => setCoursename(e.target.value)}
                    required
                    placeholder="Enter Course name"
                    value={coursename}
                  />
                </FormGroup>
                <FormGroup className="mt-4 mb-4" id="coursedesc">
                  <Form.Control
                    className="inputoutlines"
                    as="textarea"
                    autoComplete="description"
                    onChange={(e) => setCoursedesc(e.target.value)}
                    required
                    placeholder="Enter Course description"
                    value={coursedesc}
                  />
                </FormGroup>
                <FormGroup className="mt-4 mb-4" id="instructorname">
                  <Form.Control
                    className="inputoutlines"
                    type="text"
                    autoComplete="instructorname"
                    onChange={(e) => setinstructorname(e.target.value)}
                    required
                    placeholder="Enter Instructor name"
                    value={instructorname}
                  />
                </FormGroup>
                <FormGroup className="mt-4 mb-4" id="courseprice">
                  <Form.Control
                    className="inputoutlines"
                    type="text"
                    autoComplete="price"
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    placeholder="Enter Course Price (in $)"
                    value={price}
                  />
                </FormGroup>
              </Card>
            </Col>
            <Col md={3} lg={3} className="shadow newcourse">
              <Card>
                <Card.Title>Other info</Card.Title>
                <h3 className="text-start">Keywords</h3>

                <input
                  className="inputoutlines d-inline "
                  type="text"
                  onChange={(e) => setKeyword(e.target.value)}
                  value={keyword}
                />

                <Button onClick={HandleKeywordAdd} className="addbutton">
                  Add
                </Button>

                <ul className="text-start mt-2">
                  {keywords.map((keyword, index) => {
                    return (
                      <li key={index}>
                        {keyword}{' '}
                        <Button
                          className="ms-5"
                          onClick={() => deleteHandlekeywords(keyword)}
                          variant="light"
                        >
                          <i className="fas fa-trash "></i>
                        </Button>
                      </li>
                    );
                  })}
                </ul>
                <h3 className="text-start">Requirements</h3>

                <input
                  className="inputoutlines d-inline "
                  type="text"
                  onChange={(e) => setRequirement(e.target.value)}
                  value={requirement}
                />

                <Button onClick={HandleRequirementAdd} className="addbutton">
                  Add
                </Button>

                <ul className="text-start mt-2">
                  {requirements.map((requirement, index) => {
                    return (
                      <li key={index}>
                        {requirement}
                        <Button
                          className="ms-5"
                          onClick={() => deleteHandlereq(requirement)}
                          variant="light"
                        >
                          <i className="fas fa-trash "></i>
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </Card>
            </Col>
            <Col md={3} lg={3} className="shadow newcourse">
              <Card>
                <Card.Title>Section Info</Card.Title>

                <input
                  className="inputoutlines d-inline "
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={sectionTitle}
                  placeholder="Enter section title"
                />
                <input
                  className="inputoutlines d-inline mt-3"
                  type="link"
                  onChange={(e) => setLink(e.target.value)}
                  value={link}
                  placeholder="Enter video url"
                />
                <Button onClick={HandleSectionAdd} className="addbutton">
                  Add
                </Button>
                <ul className="text-start mt-2">
                  {sections.map((section, index) => {
                    return (
                      <li key={index}>
                        <div>
                          <div>{section.title}</div>
                          <div>{section.link}</div>
                        </div>
                        <Button
                          className="ms-5"
                          onClick={() => deleteHandlesections(section)}
                          variant="light"
                        >
                          <i className="fas fa-trash "></i>
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </Card>
            </Col>
          </Row>
        </Form>
      </Container>
    </Container>
  );
}
