import { Button, Typography } from "@mui/material";
import { useEffect } from "react";

const TotalResults = ({
  resetQuiz,
  currentQuizStep,
  processedAnswers,
  setCurrentQuizStep,
}) => {
  useEffect(() => {
    window.scrollTo(0, "20px");
  }, []);
  return (
    currentQuizStep === "results" && (
      <div className="result">
        <Typography component="h1" variant="h3">
          Results
        </Typography>
        <Typography component="h3" variant="h4">
          <span style={{ color: "#ff0000" }}>
            {processedAnswers.filter(({ isCorrect }) => isCorrect).length}
          </span>{" "}
          out of {processedAnswers.length}
        </Typography>
        <Button
          sx={{ marginTop: "1rem" }}
          fullWidth
          onClick={resetQuiz}
          variant="contained"
        >
          Reset
        </Button>
      </div>
    )
  );
};

export default TotalResults;
