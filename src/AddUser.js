
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AddUserss, FindUserss, UpdateUserss } from "../redux/action";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // Error states for validation
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const validateForm = () => {
    const newErrors = { name: "", email: "", phone: "", password: "" };
    let isValid = true;

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/; // Simple regex for 10-digit phone number
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = "Invalid phone number. Must be 10 digits";
      isValid = false;
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length !== 6) {
      newErrors.password = "Password must be exactly 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleData = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = { name, email, phone, password };
      if (!id) {
        dispatch(AddUserss(data));
      } else {
        dispatch(UpdateUserss(id, data));
      }
      navigate("/");
    }
  };

  // Handle input changes
  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
    setErrors({ ...errors, [event.target.name]: "" }); // Clear specific error
  };

  useEffect(() => {
    if (id) {
      dispatch(FindUserss({ id, setName, setEmail, setPhone, setPassword }));
    }
  }, [id, dispatch]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {id ? "Update User" : "Add User"}
      </Typography>
      <Button
                variant="contained"
                color="primary"
                component={Link} // Using Link for navigation
                to="/" // Adjust the path to your add user route
                style={{ marginBottom: '20px' }} // Space below the button
            >
                Display User
            </Button>
      <form onSubmit={handleData}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              name="name"
              value={name}
              onChange={handleInputChange(setName)}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={email}
              onChange={handleInputChange(setEmail)}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              name="phone"
              value={phone}
              onChange={handleInputChange(setPhone)}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              name="password"
              value={password}
              onChange={handleInputChange(setPassword)}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Grid>
          <Grid item xs={12} align="center">
            <Button type="submit" variant="contained" color="primary">
              {id ? "Update" : "Submit"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddUser;
