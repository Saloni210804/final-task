import React, { useState } from "react";
import { Container, Stack, Button, Form, Card } from "react-bootstrap";
import { Navigate } from "react-router-dom";

const Profile = ({ user, isAuthenticated }) => {
  const [newImage, setNewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
  };

  const handleSubmit = () => {
    // Here you can handle the submission of the new image
    console.log("New image submitted:", newImage);
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <Container className="my-4">
      <h1 className="mb-5" style={{ display: "flex", justifyContent: "center", alignItems: "center"}} >Your Profile</h1>
      <Card style={{ maxWidth: "500px", margin: "0 auto" }}>
        <Card.Body>
          <Stack gap={0.2} className="text-start">
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "7px",
                }}
                src={user.avatar && user.avatar.url}
                alt="avatar"
                onClick={() => document.getElementById("fileInput").click()}
              />
              <Form>
                <Form.Group controlId="formFile" className="mb-3" style={{ display: "none" }}>
                  <Form.Control type="file" onChange={handleImageChange} id="fileInput" />
                </Form.Group>
                <Button variant="primary" onClick={handleSubmit} style={{ display: "none" }} id="submitButton">
                  Save Changes
                </Button>
              </Form>
            </div>
            <hr />
            <Stack direction="horizontal" gap={3} alignItems="center">
              <p className="fw-bold">NAME:</p>
              <p>{user.name}</p>
            </Stack>
            <hr />
            <Stack direction="horizontal" gap={3} alignItems="center">
              <p className="fw-bold">EMAIL:</p>
              <p>{user.email}</p>
            </Stack>
            <hr />
            <Stack direction="horizontal" gap={3} alignItems="center">
              <p className="fw-bold">PHONE:</p>
              <p>{user.phone}</p>
            </Stack>
            <hr />
            <Button variant="primary" onClick={() => document.getElementById("fileInput").click()}>
              Change Profile Picture
            </Button>
          </Stack>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
