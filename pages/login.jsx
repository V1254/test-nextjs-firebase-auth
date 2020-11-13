import { useState } from "react";
import fetch from "isomorphic-unfetch";
import Router from "next/router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`handling submit...`);
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (response.status === 200) {
      // move forward
      return Router.push("/restricted");
    } else {
      const msg = await response.json();
      setErr(msg);
    }
  };

  return (
    <div>
      <form>
        <input
          type="text"
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
        <br />
        {
          err && <pre>{JSON.stringify(err, null, 4)}</pre>
        }  
      </form>
    </div>
  );
};

export default Login;
