import { Container, CssBaseline } from "@mui/material";
import "./App.css";
import QuestionsUI from "./components/QuestionsUI/QuestionsUI";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Container>
        <QuestionsUI />
      </Container>
    </div>
  );
}

export default App;
