import React from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Chip,
  Tooltip,
  Zoom,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import BookIcon from "@mui/icons-material/Book";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useNavigate } from "react-router-dom";
import { keyframes } from "@mui/system";

// Define animations
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const rainbow = keyframes`
  0% { border-color: #ff0000; }
  16.67% { border-color: #ff8000; }
  33.33% { border-color: #ffff00; }
  50% { border-color: #00ff00; }
  66.67% { border-color: #0000ff; }
  83.33% { border-color: #8000ff; }
  100% { border-color: #ff0000; }
`;

const YearCard = ({ year, questionCount = 50 }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/form");
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: { xs: "auto", sm: "600px", md: "580px" },
        display: "flex",
        flexDirection: { xs: "column" },
        justifyContent: "center",
        alignItems: "center",
        my: { xs: 4, sm: 5, md: 0 },
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "80%",
          maxWidth: "600px", // Add max-width to prevent horizontal scrolling
          height: "auto", // Change to auto to accommodate content
          padding: { xs: 3, sm: 4, md: 5 },
          position: "relative",
          borderRadius: { xs: "1.5vh", sm: "2vh" },
          backgroundColor: "#f5f5f5",
          transition: "all 0.3s ease-in-out",
          overflow: "hidden",
          "&:hover": {
            transform: "scale(1.03)",
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
          },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: "2px solid",
          animation: `${rainbow} 3s linear infinite`,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              mb: { xs: 3, sm: 4, md: 2 },
              fontFamily: "'Poppins', sans-serif",
              color: "#1a237e",
              textAlign: "center",
              fontSize: { xs: "1.8rem", sm: "2.2rem", md: "1.745rem" },
              animation: `${pulse} 2s infinite`,
            }}
          >
            TNPSC Question Bank - {year}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center",
              alignItems: "center",
              mb: { xs: 3, sm: 4, md: 0 },
              gap: 2,
            }}
          >
            <Chip
              icon={<BookIcon />}
              label={`${questionCount} Questions`}
              color="primary"
              sx={{
                fontSize: { xs: "0.9rem", sm: "0.9rem" },
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.1)" },
              }}
            />
            <Chip
              icon={<EmojiEventsIcon />}
              label="Prepare for Success"
              color="secondary"
              sx={{
                fontSize: { xs: "0.9rem", sm: "0.9rem" },
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.1)" },
              }}
            />
          </Box>
          <Typography
            variant="body1"
            sx={{
              color: "#424242",
              mt: { xs: 2, sm: 3, md: 1.5 },
              mb: { xs: 3, sm: 4, md: 0 },
              textAlign: "center",
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1rem" },
              lineHeight: 1.6,
            }}
          >
            Enhance your TNPSC exam preparation with our comprehensive question
            bank from {year}. Practice with real exam-style questions and boost
            your confidence!
          </Typography>
        </Box>
        <Box
          sx={{
            mt: { xs: 3, sm: 4, md: 2 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#1a237e",
              mb: { xs: 2, sm: 3, md: 1 },
              fontSize: { xs: "1.2rem", sm: "1.3rem", md: "1.4rem" },
            }}
          >
            Key Focus Areas:
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: { xs: 1, sm: 1.5, md: 0.5 },
            }}
          >
            {[
              "General Studies",
              "Tamil Language",
              "Indian History",
              "Indian Polity",
              "Geography",
            ].map((topic) => (
              <Chip
                key={topic}
                label={topic}
                variant="outlined"
                sx={{
                  m: 0.2,
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  height: { xs: "28px", sm: "32px", md: 30 },
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  },
                }}
              />
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: { xs: 4, sm: 5, md: 3 },
          }}
        >
          <Tooltip
            TransitionComponent={Zoom}
            title="Begin your practice session"
            arrow
          >
            <Button
              variant="contained"
              startIcon={<PlayArrowIcon />}
              onClick={handleStart}
              sx={{
                backgroundColor: "#1b5e20",
                color: "white",
                borderRadius: 4,
                "&:hover": {
                  backgroundColor: "#2e7d32",
                  transform: "scale(1.05)",
                },
                textTransform: "none",
                px: { xs: 3, sm: 4 },
                py: { xs: 1, sm: 1.5 },
                fontSize: { xs: "1rem", sm: "1.2rem" },
                fontWeight: "bold",
                transition: "all 0.3s ease",
              }}
            >
              Start
            </Button>
          </Tooltip>
        </Box>
      </Paper>
    </Box>
  );
};

export default YearCard;
