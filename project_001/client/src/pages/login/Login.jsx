import { useState } from "react";
import "../../assets/style/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: integrate login API
    console.log({ email, password });
    alert("Login submitted!");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <p>Enter your credentials to access your account</p>

        <form onSubmit={handleSubmit} autoComplete="off">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="off"
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>

        
      </div>
    </div>
  );
};

export default Login;
