import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = ({ isSignup }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = (e) => {
    e.preventDefault();

    if (
      (isSignup && name && email && password) ||
      (!isSignup && email && password)
    ) {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      if (isSignup) {
        const userExists = users.find((user) => user.email === email);
        if (userExists) {
          alert("User already exists. Please log in.");
          return;
        }
        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("user", JSON.stringify({ name, email }));
        navigate("/");
      } else {
        const existingUser = users.find(
          (user) => user.email === email && user.password === password
        );
        if (existingUser) {
          localStorage.setItem(
            "user",
            JSON.stringify({ name: existingUser.name, email })
          );
          navigate("/");
        } else {
          alert(
            "Invalid credentials. Please check your input or sign up first."
          );
        }
      }
    } else {
      alert("Please fill all required fields");
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage: `url('https://i.pinimg.com/736x/19/8b/2f/198b2f01e73b905772279616eccc7c65.jpg')`,
      }}
    >
      <form
        onSubmit={handleAuth}
        className="bg-neutral-900 bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-md text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          {isSignup ? "Sign Up" : "Login"}
        </h2>

        {isSignup && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 p-3 rounded bg-neutral-700 text-white"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-neutral-700 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-neutral-700 text-white"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:scale-95 transition-all font-semibold py-3 rounded"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p
          className="text-sm text-center mt-4 cursor-pointer underline"
          onClick={() => navigate(isSignup ? "/login" : "/signup")}
        >
          {isSignup
            ? "Already have an account? Log in"
            : "Don't have an account? Sign up"}
        </p>
      </form>
    </div>
  );
};

export default AuthPage;
