import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/style/login.css";


// Context
import { useAuth } from "../../context/AuthContext";
const Login = () => {
  const { login, authMessage } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <p>Enter your credentials to access your account</p>

        {authMessage && <p className="text-danger">{authMessage}</p>}

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
