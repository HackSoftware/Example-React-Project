import axios from 'axios';

import { useState } from 'react';

import { setToken, getToken } from 'config/storage';
import { BASE_API_URL } from 'config/urls';

const LoginPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const login = () => {
    axios
      .post(`${BASE_API_URL}/auth/jwt/login/`, { email, password })
      .then(({ data }) => {
        console.log(data);
        setToken(data.token);
      });
  };

  return (
    <div>
      <div>Login page</div>

      <p>Do we have token? {getToken()}</p>

      <div>Open the console and see the progress!</div>
      <div>
        Email
        <input
          type="email"
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button onClick={login}>Login</button>
    </div>
  );
};

export default LoginPage;
