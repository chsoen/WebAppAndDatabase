import axios from "axios";
import React, { useState } from "react";

export function Form() {
  const [inputFirstName, setFirstName] = useState("");
  const [inputLastName, setLastName] = useState("");
  const [inputAge, setAge] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("sending info\n");
    axios
      .post("http://127.0.0.1:5000/api/test", {
        inputFirstName: inputFirstName,
        inputLastName: inputLastName,
        inputAge: inputAge,
      })
      .then(function (response) {
        console.log(response.data);
        setFirstName("Success");
        setLastName("Success");
        setAge("Success");
        (e.target as HTMLFormElement).reset();
      })
      .catch(function (error) {
        console.error(error);
        setFirstName("Error");
        setLastName("Error");
        setAge("Error");
      });
  }

  return (
    <form onSubmit={(e) => {handleSubmit(e)}}>
      <label>First Name: </label>
      <input
        placeholder={inputFirstName}
        onChange={(e) => {
          setFirstName(e.target.value);
          console.log("First name set\n");
        }}
        type="text"
      />
      <br></br>
      <label>Last Name: </label>
      <input
        placeholder={inputLastName}
        onChange={(e) => {
          setLastName(e.target.value);
          console.log("Last name set\n");
        }}
        type="text"
      />
      <br></br>
      <label>Age: </label>
      <input
        placeholder={inputAge}
        onChange={(e) => {
          setAge(e.target.value);
          console.log("Age set\n");
        }}
        type="number"
      />
      <br></br>
      <button type="submit">Submit</button>
    </form>
  );
}
