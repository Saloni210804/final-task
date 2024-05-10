import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Card } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import logo from "../logo/logo.png";

function Register({ isAuthenticated, setIsAuthenticated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("avatar", avatar);
    await axios
      .post("http://localhost:4000/api/v1/user/register", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setAvatar("");
        setIsAuthenticated(true);
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "800px" }}
    >
      <div className="position-absolute top-0 start-50 translate-middle-x">
        <img src={logo} alt="Logo" style={{ width: "150px", height: "70px", marginTop:"10px" }} />
      </div>
      <Card className="p-4 shadow-lg rounded-3" style={{ zIndex: 1 }}>
        <Form onSubmit={handleRegister}>
          <h3 className="text-center mb-4">REGISTER</h3>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAvatar">
            <Form.Label>Avatar</Form.Label>
            <Form.Control type="file" onChange={avatarHandler} />
          </Form.Group>
          <Form.Group className="text-center">
            <Form.Label>
              Already Registered?{" "}
              <Link to={"/login"} className="text-decoration-none">
                LOGIN
              </Link>
            </Form.Label>
          </Form.Group>
          <Button
            variant="warning"
            type="submit"
            className="w-100 text-light fw-bold fs-5"
          >
            Submit
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default Register;
