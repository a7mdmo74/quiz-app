import {
  Grid,
  Paper,
  Select,
  Button,
  MenuItem,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useState, useEffect } from "react";
import TotalResults from "../TotalResults/TotalResults";

const QuizAnswers = ({
  classes,
  quizData,
  resetQuiz,
  currentQuizStep,
  setCurrentQuizStep,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [processedAnswers, setProcessedAnswers] = useState([]);

  const handleResult = (e) => {
    e.preventDefault();

    const processedAnswers = selectedAnswers.map(({ answer, question }) => {
      const relatedQuestion = quizData.find(
        (category) => category.question === question
      );
      if (relatedQuestion.correct_answer === answer) {
        return { correctAnswer: answer, isCorrect: true, question };
      }
      return {
        correctAnswer: relatedQuestion.correct_answer,
        wrongAnswer: answer,
        isCorrect: false,
        question,
      };
    });

    setProcessedAnswers(processedAnswers);
  };

  const handleAnswerChange = (e, selectedQuestion) => {
    e.preventDefault();
    const { value } = e.target;

    const isExistQuestion =
      selectedAnswers.length &&
      selectedAnswers.find((answer) => answer.question === selectedQuestion);

    if (isExistQuestion && isExistQuestion.answer) {
      const updatedAnswers = selectedAnswers.map((answer) => {
        if (answer.question === selectedQuestion) {
          return { question: selectedQuestion, answer: value };
        }
        return answer;
      });
      setSelectedAnswers(updatedAnswers);
    } else {
      setSelectedAnswers([
        ...selectedAnswers,
        { question: selectedQuestion, answer: value },
      ]);
    }
  };

  const relatedAnswer = (question, selectedAnswers) => {
    if (selectedAnswers && selectedAnswers.length) {
      const relatedQuestion = selectedAnswers.find(
        (answer) => answer.question === question
      );
      return (relatedQuestion && relatedQuestion.answer) || "";
    }
    return "";
  };

  useEffect(() => {
    window.scrollTo(0, "20px");
  }, []);

  return !processedAnswers || !processedAnswers.length ? (
    <>
      <Typography component="h3" variant="h4" marginBottom="1rem">
        Answer following Questions:
      </Typography>
      <form onSubmit={handleResult}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            {quizData.map((quiz) => (
              <Paper
                key={quiz.question}
                sx={{ padding: "1rem", margin: "1rem 0" }}
              >
                <Typography component="h5" variant="h6" marginBottom="1rem">
                  {quiz.question}
                </Typography>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="answer-select-label">
                    Select answer:
                  </InputLabel>
                  <Select
                    required
                    name="answer"
                    id="answer-select"
                    label="Select answer"
                    value={relatedAnswer(quiz.question, selectedAnswers) || ""}
                    onChange={(e) => handleAnswerChange(e, quiz.question)}
                  >
                    {quiz.answers.map((answer) => (
                      <MenuItem key={answer} value={answer}>
                        {answer}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Paper>
            ))}
            <Button variant="contained" color="primary" type="submit">
              Result
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  ) : (
    <TotalResults
      resetQuiz={resetQuiz}
      currentQuizStep={currentQuizStep}
      processedAnswers={processedAnswers}
      setCurrentQuizStep={setCurrentQuizStep}
    />
  );
};

export default QuizAnswers;
