import { useState } from 'react'
import './App.css'
import axios from 'axios';
import { Form } from './Form';

function App() {
  const [buttonText, setButtonText] = useState("Test Connection")

  function testConnection() {
    return axios.get('http://127.0.0.1:5000')
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
  }

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  return (
    <>
      <h1>Web App w Database</h1>
      <div className="card">
        <button onClick={async function () {
          setButtonText(await testConnection());
          await delay(2000);
          setButtonText("Test Connection");
        }}>
          {buttonText}
        </button>
        <Form/>
      </div>
      <p className="footer">
        Chan Soen
      </p>
    </>
  );
}

export default App
