import React from 'react';
import { Typography, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const { totalQuestions, score } = location.state || { totalQuestions: 0, score: 0 };

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Exam Results
      </Typography>
      <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
        Congratulations on completing the exam!
      </Typography>
      <Typography variant="h6" color="textPrimary" sx={{ mb: 3 }}>
        Score: {score}/{totalQuestions}
      </Typography>
    </Box>
  );
};

export default Result;
