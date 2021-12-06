import axios from 'axios';

import { useState } from 'react';

import { BASE_API_URL } from 'config/urls';

const LoginPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const login = () => {
    axios.post(`${BASE_API_URL}/auth/login/`, { email, password }).then(() => {
      console.log('logged in');
    });
  };

  return (
    <div>
      <div>Login page</div>

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
