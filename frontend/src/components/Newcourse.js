import React, { useState } from 'react';
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
  const [sections, updateSections] = useState([]);
  const { currentUser } = useUserAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState('');

  const navigate = useNavigate();

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
        });
        console.log(res);
        navigate('/teacherdashboard');
      } catch (error) {
        setError(error);
      }
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  }
  const uploadThumbnail = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'Image_upload');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/educatify-image/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    const url = await res.json();
    console.log(url);
  };
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
    updateSections((prevValue) => {
      return [...prevValue, { title: sectionTitle, link: link }];
    });
    setTitle('');
    setLink('');
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
                <img id="uploadedimage" src="" alt="thumbnail"></img>
                <input
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
                <span className="ms-2">
                  <input
                    className="inputoutlines d-inline "
                    type="text"
                    onChange={(e) => setKeyword(e.target.value)}
                    value={keyword}
                  />
                </span>
                <span className="d-inline">
                  <Button onClick={HandleKeywordAdd} className="addbutton">
                    Add
                  </Button>
                </span>
                <ul>
                  {keywords.map((keyword, index) => {
                    return <li key={index}>{keyword}</li>;
                  })}
                </ul>
                <h3 className="text-start">Requirements</h3>
                <span className="ms-2">
                  <input
                    className="inputoutlines d-inline "
                    type="text"
                    onChange={(e) => setRequirement(e.target.value)}
                    value={requirement}
                  />
                </span>
                <span className="d-inline">
                  <Button onClick={HandleRequirementAdd} className="addbutton">
                    Add
                  </Button>
                </span>
                <ul>
                  {requirements.map((requirement, index) => {
                    return <li key={index}>{requirement}</li>;
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
                />
                <input
                  className="inputoutlines d-inline "
                  type="link"
                  onChange={(e) => setLink(e.target.value)}
                  value={link}
                />
                <Button onClick={HandleSectionAdd} className="addbutton">
                  Add
                </Button>
                <ul>
                  {sections.map((section, index) => {
                    return (
                      <li key={index}>
                        <div>
                          {section.title}
                          {section.link}
                        </div>
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
