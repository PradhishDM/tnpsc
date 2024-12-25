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
  const [formData, setFormData] = useState({
    name: "",
    contactNo: "",
    whatsappNo: "",
    email: "",
  });
  const [isReady, setIsReady] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    // Set isReady to true after a short delay to ensure DOM is ready
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
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
                {Object.keys(formData).map((field, index) => (
                  <Grid item xs={12} key={field}>
                    <StyledTextFieldContainer
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * (index + 1) }}
                    >
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
                        variant="outlined"
                        required
                        type={
                          field.includes("No")
                            ? "tel"
                            : field === "email"
                            ? "email"
                            : "text"
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
