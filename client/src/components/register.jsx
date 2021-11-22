import React from "react";
import axios from "axios";
import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const user = {
      name: name,
      email: email,
      password: password,
    };
    const response = await axios.post("http://localhost:5000/api/register", user);
    if(response.data.status === "ok"){
        window.location.href='/login'
    }
    else{
      alert('Email already exists')
    }
    setName("");
    setEmail("");
    setPassword("");
  }

  return (
    <div className="auth">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        Username : <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <br />
        Email : <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <br />
        Password : <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Register;
