import axios from "axios";
import { useState } from "react";

export function Form () {
    const [inputName, setName] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        axios.post('http://127.0.0.1:5000/api/test', {
            dataName: inputName,
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