import React, { useEffect, useState } from "react";
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import questionsData from "../questions.json";

const QuestionInterface = () => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [numbers] = useState(
    Array.from({ length: questionsData.questions.length }, (_, i) => i + 1)
  );
  const [answers, setAnswers] = useState({});
  const questions = questionsData.questions;
  const [score, setscore] = useState(0);
  const navigate = useNavigate();

  const handleAnswerChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedAnswer(selectedOption);

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: selectedOption,
    }));

    if (questions[currentQuestionIndex].id === selectedOption) {
      console.log("Correct Answer");
    } else {
      console.log("Incorrect Answer");
    }
  };

  useEffect(() => {
    setSelectedAnswer(answers[currentQuestionIndex] || "");
  }, [currentQuestionIndex, answers]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        setSelectedNumber(newIndex + 1); // Update selected number to match the new question
        return newIndex;
      });
    }

    if (questions[currentQuestionIndex].id === selectedAnswer) {
      setscore((prevScore) => prevScore + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNumberClick = (number) => {
    setSelectedNumber(number);
    setCurrentQuestionIndex(number - 1);
  };

  const handleSubmit = () => {
    setOpenConfirmation(true);
  };

  const handleConfirmSubmit = () => {
    setOpenConfirmation(false);
    setOpenSuccess(true);

    setTimeout(() => {
      navigate("/result", {
        state: { totalQuestions: questions.length, score },
      });
    }, 1000);
  };

  const handleCancelSubmit = () => {
    setOpenConfirmation(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSuccess(false);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 0.5,
            p: 5,
            marginLeft: { xs: "0", md: "90px" },
            flexDirection: { xs: "column", md: "row" },
            width: "100%",
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              p: 3,
              borderRadius: 2,
              boxShadow: 8,
              width: { xs: "100%", md: "25%" },
              mb: { xs: 3, md: 0 },
            }}
          >
            <Grid
              container
              direction="row"
              spacing={3}
              justifyContent="center"
              alignItems="center"
            >
              {numbers.map((number) => (
                <Grid item xs={3} key={number}>
                  <Button
                    variant="contained"
                    sx={{
                      width: "60px",
                      height: "60px",
                      backgroundColor:
                        selectedNumber === number ? "#f59e0b" : "#22c55e",
                      borderRadius: "50%",
                      marginBottom: "5px",
                      "&:hover": {
                        backgroundColor:
                          selectedNumber === number ? "#f97316" : "#16a34a",
                      },
                    }}
                    onClick={() => handleNumberClick(number)}
                  >
                    {number}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box
            sx={{
              backgroundColor: "white",
              p: 4,
              borderRadius: 2,
              boxShadow: 2,
              width: { xs: "100%", md: "60%" },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Question: {currentQuestionIndex + 1} of {questions.length}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {questions[currentQuestionIndex].question}
            </Typography>

            <FormControl component="fieldset">
              <FormLabel component="legend">Options:</FormLabel>
              <RadioGroup value={selectedAnswer} onChange={handleAnswerChange}>
                {questions[currentQuestionIndex].options.map((option) => (
                  <FormControlLabel
                    key={option.id}
                    value={option.id}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}
            >
              <Button
                variant="outlined"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              <Button variant="contained" color="error" onClick={handleSubmit}>
                Submit
              </Button>
              <Button
                variant="outlined"
                onClick={handleNext}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      </div>

      <Dialog open={openConfirmation} onClose={handleCancelSubmit}>
        <DialogTitle>Are you sure you want to submit?</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Once you submit, you can't go back to change your answers.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelSubmit} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Exam successfully completed!"
      />
    </div>
  );
};

export default QuestionInterface;
