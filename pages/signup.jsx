import { useState } from "react";
import Router from 'next/router';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (response.status === 200) {
      // move forward
      return Router.push("/login");
    } else {
      const msg = await response.json();
      setErr(msg);
    }
  }

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
        <button type="submit" onClick={handleSubmit}>Signup</button>
      </form>
      {
        err && JSON.stringify(err,null,4)
      }
    </div>
  );
};

export default SignUp;
