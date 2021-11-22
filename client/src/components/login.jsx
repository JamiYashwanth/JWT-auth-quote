import React from "react";
import axios from "axios";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
        email : email,
        password : password
    }
    const response = await axios.post("http://localhost:5000/api/login", data);
    console.log('response = ',response.data);

    if(response.data.user){
        localStorage.setItem('token',response.data.user)
        alert('Login successful!!!')
        window.location.href='/dashboard'
    }
    else{
        alert('Wrong credentials!!!')
    }

    setEmail("");
    setPassword("");
  }

  return (
    <div className="auth">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        Email :{" "}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <br />
        Password :{" "}
        <input
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

export default Login;
