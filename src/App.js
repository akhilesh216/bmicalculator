import { Alert } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./App.css";

function App() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [display, setDisplay] = useState();
  const [error1, setError1] = useState(true);
  const [error2, setError2] = useState(true);

  const heightChangeHandle = (e) => {
    let { value, min, max } = e.target;
    //console.log(value);

    if (parseFloat(value) > parseFloat(min)) {
      if (parseFloat(value) > parseFloat(max)) {
        //setHeight(value.slice(0, value.length - 1));
      } else {
        setHeight(value);
        setError1(true);
      }
    } else {
      setHeight(value);
      setError1(false);
    }

    // console.log(value1);

    //setHeight(e.target.value);
  };
  const weightChangeHandle = (e) => {
    let { value, min, max } = e.target;
    console.log(value);
    if (parseFloat(value) > parseFloat(min)) {
      if (parseFloat(value) > parseFloat(max)) {
        //setWeight(value.slice(0, value.length - 1));
        //let h1=(value.slice(0, value.length - 1));
        //setWeight(h1);
        //console.log(value);
      } else {
        setWeight(value);
        //console.log(value);
        setError2(true);
      }
    } else {
      setWeight(value);
      //console.log(value);
      setError2(false);
    }
    //setWeight(e.target.value);
  };

  const click = async () => {
    let result = await fetch("http://localhost:3000/api/calculatebmi", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        height: parseFloat(height),
        weight: parseFloat(weight),
      }),
    });
    let bmi_value = await result.json();
    //console.log(bmi_value);
    // console.log(bmi_value.bmi);
    //setDisplay(bmi_value.bmi);
    setDisplay(parseFloat(bmi_value.bmi).toFixed(2));
    //console.log(display);
    //let roundDisplay = parseInt(bmi_value.bmi).toFixed(2);
  };

  const clickreset = (e) => {
    setHeight("");
    setWeight("");
    setDisplay(null);
  };

  return (
    <div className="d-flex flex-column  mt-3 flex1">
      <div className=" bg-secondary box1">
        <span className="bmical"> BMI CALCULATOR</span>
        <div className="insidebox">
          <div className="output">{display}</div>
        </div>
        <div className="buttondiv">
          <button
            disabled={height == "" || !error1 || weight == "" || !error2}
            type="submit"
            className="btn btn-success button1"
            onClick={click}
          >
            CALCULATE
          </button>
          <button
            type="submit"
            className="btn btn-success button2"
            onClick={clickreset}
          >
            RESET
          </button>
        </div>
      </div>

      <div className="d-flex flex-row  bg-primary flex2">
        <div className=" bg-primary heightweight ">
          <span className="spanname">Height(cms)</span>
          <input
            className="input1"
            type="number"
            step=".01"
            value={height}
            onChange={heightChangeHandle}
            min="30"
            max="300"
            required
          ></input>
          {!error1 && <span className="instruction">min: 30 max: 300</span>}
        </div>
        <div className=" bg-primary heightweight ">
          <span className="spanname"> Weight(kgs)</span>
          <input
            className="input1"
            type="number"
            step=".01"
            value={weight}
            onChange={weightChangeHandle}
            min="10"
            max="300"
            required
          ></input>
          {!error2 && <span className="instruction">min: 10 max: 300</span>}
        </div>
      </div>
    </div>
  );
}

export default App;
