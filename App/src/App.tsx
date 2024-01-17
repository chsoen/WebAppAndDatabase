import { useState } from "react";
import "./App.css";
import axios from "axios";
import { Form } from "./components/Form";

function App() {
  const defaultButtonText = "Test Connection";
  const [buttonText, setButtonText] = useState(defaultButtonText);

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  async function testConnection() {
    const text = await axios
      .get("http://127.0.0.1:5000")
      .then(function (response) {
        return response.data as string;
      })
      .catch(function (error) {
        console.error(error);
        return "No connection";
      });
    return text;
  }

  function clickButton() {
    testConnection()
      .then(function (response) {
        setButtonText(response);
        delay(2000)
          .then(function () {
            setButtonText(defaultButtonText);
          })
          .catch(function (error) {
            console.error(error);
          });
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <>
      <h1>Web App w Database</h1>
      <div className="card">
        <button
          onClick={() => {
            clickButton();
          }}
        >
          {buttonText}
        </button>
      </div>
      <Form />
      <p className="footer">Chan Soen</p>
    </>
  );
}

export default App;
