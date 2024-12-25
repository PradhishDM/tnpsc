import { Box, Grid } from "@mui/material";
import YearCard from "../components/YearCard";

const QuestionBanks = () => {
  return (
    <Box sx={{ margin: "2vh" }}>
      <Grid
        container
        spacing={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <YearCard year="2021" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <YearCard year="2022" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <YearCard year="2023" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default QuestionBanks;
