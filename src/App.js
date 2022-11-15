import { Button } from "@mui/material";
import "./App.css";
import React from "react";
import Country from "./component/Country";
function App() {
  const [theme, setTheme] = React.useState(true);
  const changeTheme = () => {
    setTheme(!theme);
  };
  return (
    <div
      className="App"
      style={
        theme
          ? { backgroundColor: "white", color: "black" }
          : { backgroundColor: "black", color: "white" }
      }
    >
      <Button variant="outlined" onClick={changeTheme}>
        Theme
      </Button>
      <Country />
    </div>
  );
}

export default App;
