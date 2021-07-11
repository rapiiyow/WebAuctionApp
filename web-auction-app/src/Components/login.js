import React, { useState } from "react";
import axios from "axios";
import { setUserSession } from "../Utils/common";

function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput("");
  const [error, setError] = useState(null);

  const handleLogin = () => {
    setError(null);
    setLoading(true);

    axios
      .get(process.env.REACT_APP_API + "users/" + username.value)
      .then((response) => {
        setLoading(false);
        setUserSession(response.data.UserId);
        props.history.push("/home");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        if (error.response.status === 401)
          setError(error.response.data.message);
        else setError("Access Denied");
      });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form>
          <h3>Sign In</h3>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="mt-2 form-control"
              placeholder="Enter Username"
              {...username}
              autoComplete="new-password"
            />
          </div>
          {error && (
            <>
              <small style={{ color: "red" }}>{error}</small>
              <br />
            </>
          )}
          <br />
          <button
            type="submit"
            className="mt-3 btn btn-primary btn-block"
            value={loading ? "Loading..." : "Login"}
            onClick={handleLogin}
            disabled={loading}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Login;
