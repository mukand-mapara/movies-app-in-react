import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (name && email && password) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const existingUser = users.find(
        (user) =>
          user.email === email &&
          user.password === password &&
          user.name === name
      );

      if (existingUser) {
        localStorage.setItem("user", JSON.stringify({ name, email }));
        navigate("/");
      } else {
        alert("Invalid credentials. Please check your input or sign up first.");
      }
    } else {
      alert("Please enter all credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-neutral-800 p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-neutral-700 text-white"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-neutral-700 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-neutral-700 text-white"
        />
        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 p-2 rounded"
        >
          Login
        </button>
        <p
          className="text-sm text-center mt-4 cursor-pointer underline"
          onClick={() => navigate("/signup")}
        >
          Don't have an account? Sign up
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
