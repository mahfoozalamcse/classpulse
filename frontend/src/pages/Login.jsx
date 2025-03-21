import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/Login", { email, password });
      localStorage.setItem("token", res.data.token);
      if (res.data.role === "student") navigate("/student-dashboard");
      else if (res.data.role === "teacher") navigate("/teacher-dashboard");
      else navigate("/admin-dashboard");
    } catch (error) {
      alert("Login failed! Check credentials.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};





export default Login;



