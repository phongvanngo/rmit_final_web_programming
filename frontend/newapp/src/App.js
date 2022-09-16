import logo from "./logo.svg";
import "./App.css";
import Father from "./components/Father";
import Son from "./components/Son";
import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(1);

  const [isRunning, setIsRunning] = useState(false);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  useEffect(() => {
    if (isRunning) {
      setTimeout(() => {
        setCount((count) => {
          if (count === 60) return 1;
          return count + 1;
        });
      }, 1000);
    }
  }, [count, isRunning]);

  return (
    <div className="App">
      <Father count={count} />
      <Son handleStart={handleStart} handleStop={handleStop} />
    </div>
  );
}

export default App;
