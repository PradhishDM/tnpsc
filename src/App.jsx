import { Box, Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import QuizForm from "./pages/QuizForm";
import QuestionBanks from "./pages/QuestionBanks";

function App() {
  return (
    <>
      <Box>
        <Typography
          variant="h5"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "2vh",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            fontSize: "2.5rem",
            letterSpacing: "0.1rem",
            textTransform: "uppercase",
            background:
              "linear-gradient(90deg, #2E7D32 20%,rgb(12, 56, 106) 80%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "fadeIn 2s ease-in-out",
          }}
        >
          TNPSC
        </Typography>
      </Box>

      <Routes>
        <Route path="/" element={<QuestionBanks />} />
        <Route path="/form" element={<QuizForm />} />
      </Routes>
    </>
  );
}

export default App;
