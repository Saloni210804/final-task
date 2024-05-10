import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import logo from "../logo/logo.png";

function Login({ isAuthenticated, setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:4000/api/v1/user/login",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        setEmail("");
        setPassword("");
        setIsAuthenticated(true);
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <Container className="d-flex justify-content-center align-items-center overflow-y-hidden" style={{ minHeight: "700px" }}>
      <div className="position-absolute top-0 start-50 translate-middle-x">
        <img src={logo} alt="Logo" style={{ width: "170px", height: "70px", marginTop:"70px"}} />
      </div>
      <Card className="p-4 shadow-lg rounded-3" style={{ zIndex: 1 }}>
        <Form onSubmit={handleLogin}>
          <h3 className="text-center mb-4">LOGIN</h3>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
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
          <Form.Group className="text-center mb-3">
            <Form.Label>
              Not Registered?{" "}
              <Link to={"/register"} className="text-decoration-none ">
                REGISTER NOW
              </Link>
            </Form.Label>
          </Form.Group>
          <Button variant="success" type="submit" className="w-100 text-light fw-bold fs-5">
            Submit
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default Login;
