import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./components/Login"

const App = () => {
  const [test, setTest] = useState("");
  const [input, setInput] = useState("");

  const submit = async () => {
    await axios.post("/", { test: input });
    // console.log(a);

    getData();
  };

  const getData = async () => {
    const db = await axios.get("/data");
    console.log(db.data);
    let display = "";
    for (var i = 0; i < db.data.length; i++) {
      display += db.data[i].name + ", ";
    }
    console.log(display);
    setTest(display);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <Login />
      {/* <input
        onChange={(event) => setInput(event.target.value)}
        type="text"
        id="test"
        name="test"
      />
      <button onClick={submit} type="submit">
        click me to add to test model in DB
      </button>

      <div>
        <b>Test Database Data: </b>
        {test}
      </div> */}
    </div>
  );
};

export default App;
