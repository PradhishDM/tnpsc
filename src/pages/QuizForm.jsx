import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Paper,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  Zoom,
  Fade,
} from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#2E7D32",
    },
    secondary: {
      main: "#1565C0",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  backgroundColor: "#ffffff",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const StyledTextFieldContainer = styled(motion.div)(({ theme }) => ({
  position: "relative",
  "& .MuiTextField-root": {
    width: "100%",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    transition: "box-shadow 0.3s, transform 0.3s",
    "&:hover": {
      boxShadow: "0 4px 20px rgba(46, 125, 50, 0.2)",
      transform: "scale(1.02)",
    },
    "&.Mui-focused": {
      boxShadow: "0 4px 20px rgba(46, 125, 50, 0.4)",
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 30,
  padding: "12px 32px",
  fontSize: "1rem",
  textTransform: "none",
  transition: "all 0.3s",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
  },
}));

const QuizForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    contactNo: "",
    whatsappNo: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isReady, setIsReady] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    // Set isReady to true after a short delay to ensure DOM is ready
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleValidation = (field, value) => {
    switch (field) {
      case "contactNo":
      case "whatsappNo":
        return /^\d{10}$/.test(value);
      case "email":
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      default:
        return value.trim() !== "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (touched[name]) {
      const isValid = handleValidation(name, value);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: !isValid }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));

    const isValid = handleValidation(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: !isValid }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    let hasError = false;

    Object.keys(formData).forEach((field) => {
      const isValid = handleValidation(field, formData[field]);
      newErrors[field] = !isValid;
      if (!isValid) hasError = true;
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      contactNo: true,
      whatsappNo: true,
      email: true,
    });

    if (!hasError) {
      navigate("/questions");
      console.log("Form Data Submitted:", formData);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ mt: 5, mb: 5 }}>
        <Zoom
          in={isReady}
          style={{ transitionDelay: isReady ? "200ms" : "0ms" }}
        >
          <StyledPaper elevation={4}>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              align="center"
              sx={{
                fontWeight: "bold",
                mb: 1,
                background: "linear-gradient(45deg, #2E7D32 30%, #1565C0 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Registration Form
            </Typography>
            <Fade
              in={isReady}
              style={{ transitionDelay: isReady ? "400ms" : "0ms" }}
            >
              <Typography
                variant="body2"
                align="center"
                sx={{ color: "text.secondary", mb: 3 }}
              >
                Please fill in your details to register.
              </Typography>
            </Fade>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {Object.keys(formData).map((field) => (
                  <Grid item xs={12} key={field}>
                    <StyledTextFieldContainer>
                      <StyledTextField
                        fullWidth
                        label={
                          field.charAt(0).toUpperCase() +
                          field
                            .slice(1)
                            .replace(/([A-Z])/g, " $1")
                            .trim()
                        }
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="outlined"
                        required
                        helperText={
                          errors[field]
                            ? field === "email"
                              ? "Enter a valid email address."
                              : field.includes("No")
                              ? "Enter a valid 10-digit number."
                              : "This field is required."
                            : ""
                        }
                        error={!!errors[field]}
                        type={
                          field.includes("No")
                            ? "tel"
                            : field === "email"
                            ? "email"
                            : "text"
                        }
                        inputProps={
                          field.includes("No")
                            ? {
                                maxLength: 10,
                                inputMode: "numeric",
                                pattern: "\\d*",
                              }
                            : {}
                        }
                        onInput={
                          field.includes("No")
                            ? (e) => {
                                e.target.value = e.target.value.replace(
                                  /[^0-9]/g,
                                  ""
                                );
                              }
                            : undefined
                        }
                      />
                    </StyledTextFieldContainer>
                  </Grid>
                ))}
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 4,
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <StyledButton
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </StyledButton>
                </motion.div>
              </Box>
            </form>
          </StyledPaper>
        </Zoom>
      </Container>
    </ThemeProvider>
  );
};

export default QuizForm;
