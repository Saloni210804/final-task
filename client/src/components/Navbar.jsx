import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, NavDropdown, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import logo from "../logo/logo.png";

function Header({ setTasks, setIsAuthenticated, isAuthenticated, setTaskTitle }) {
  const [allTasks, setAllTasks] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    completed: false,
    incomplete: false,
    archived: false,
    highPriority: false,
    mediumPriority: false,
    lowPriority: false,
    allTasks: false,
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTasks();
  }, [isAuthenticated]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/task/mytask", { withCredentials: true });
      setAllTasks(response.data.tasks);
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/user/logout", { withCredentials: true });
      toast.success(data.message);
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const filterTasks = () => {
    let filteredTasks = allTasks.filter(task => {
      if (filterCriteria.allTasks) return true;
      let satisfiesCriteria = true;
      if (filterCriteria.completed && task.status !== "completed") satisfiesCriteria = false;
      if (filterCriteria.incomplete && task.status !== "incomplete") satisfiesCriteria = false;
      if (filterCriteria.archived && !task.archived) satisfiesCriteria = false;
      if (filterCriteria.highPriority && task.priority !== "high") satisfiesCriteria = false;
      if (filterCriteria.mediumPriority && task.priority !== "medium") satisfiesCriteria = false;
      if (filterCriteria.lowPriority && task.priority !== "low") satisfiesCriteria = false;
      return satisfiesCriteria;
    });
    setTasks(filteredTasks);
    setTaskTitle("Filtered Tasks");
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilterCriteria(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSearch = () => {
    const filteredTasks = allTasks.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setTasks(filteredTasks);
    setTaskTitle("Filtered Tasks");
  };

  return (
    <Navbar expand="lg" className={`bg-body-tertiary ${!isAuthenticated ? "d-none" : ""}`}>
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            alt="Logo"
            style={{ width: "100px", height: "40px", marginRight: "10px" }}
          />
          TASK MANAGER
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center"> {/* Center the content */}
          <Nav className="me-auto">
            <Button as={Link} to={"/"} className="nav-link me-2" variant="primary" style={{ width: "100px", height: "40px", marginRight: "100px" }}>
              Home
            </Button>
            <Button as={Link} to={"/profile"} className="nav-link me-2" variant="primary" style={{ width: "100px", height: "40px", marginRight: "100px"}}>
              Profile  
            </Button>
            <NavDropdown title="Filter Tasks" id="basic-nav-dropdown" variant="primary" className="mb-2">
            <div className="p-2">
              <Form.Check 
                type="checkbox" 
                label="Completed" 
                name="completed" 
                checked={filterCriteria.completed} 
                onChange={handleCheckboxChange}
                className="mb-2"
              />
              <Form.Check 
                type="checkbox" 
                label="Incomplete" 
                name="incomplete" 
                checked={filterCriteria.incomplete} 
                onChange={handleCheckboxChange}
                className="mb-2"
              />
              <Form.Check 
                type="checkbox" 
                label="Archived" 
                name="archived" 
                checked={filterCriteria.archived} 
                onChange={handleCheckboxChange}
                className="mb-2"
              />
              <Form.Check 
                type="checkbox" 
                label="High Priority" 
                name="highPriority" 
                checked={filterCriteria.highPriority} 
                onChange={handleCheckboxChange}
                className="mb-2"
              />
              <Form.Check 
                type="checkbox" 
                label="Medium Priority" 
                name="mediumPriority" 
                checked={filterCriteria.mediumPriority} 
                onChange={handleCheckboxChange}
                className="mb-2"
              />
              <Form.Check 
                type="checkbox" 
                label="Low Priority" 
                name="lowPriority" 
                checked={filterCriteria.lowPriority} 
                onChange={handleCheckboxChange}
                className="mb-2"
              />
              <Form.Check 
                type="checkbox" 
                label="All Tasks" 
                name="allTasks" 
                checked={filterCriteria.allTasks} 
                onChange={handleCheckboxChange}
                className="mb-3"
              />
              <Button variant="primary" className="me-2" onClick={filterTasks}>Apply Filters</Button>
              </div>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="text"
              placeholder="Search tasks by title"
              className="me-lg-2 mb-3 mb-lg-0 "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-primary" onClick={handleSearch}style={{  height: "38px"}}>Search</Button>
          </Form>
          <Button className="bg-danger border-0 ms-2 " onClick={handleLogout}> {/* Adjust margin */}
           Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
