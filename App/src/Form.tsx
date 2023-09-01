import axios from "axios";
import { useState } from "react";

export function Form () {
    const [inputName, setName] = useState("");

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        axios.post('http://127.0.0.1:5000/api/test', {
            dataName: inputName,
        })
        .then(function (response) {
            console.log(response.data);
            setName("Success");
            delay(1000)
            .then(function () {
                setName("");
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
        <form onSubmit={handleSubmit}>
          <label>Name: </label>
          <input
          value={inputName}
          onChange={e => setName(e.target.value)}
          type="text"
          />
        </form>
    )
}