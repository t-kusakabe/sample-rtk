import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { loginAsync, selectLoadingStatus } from './features/auth/authSlice';
import { useLoginMutation } from './features/rtk-auth/rtkAuthSlice';

function App() {
  const [userName, setUserName] = useState<string>('');
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const dispatch = useAppDispatch();
  const loadingStatus = useAppSelector(selectLoadingStatus);
  const loginHandler = async () => {
    const result = await dispatch(
      loginAsync({
        userName: userName,
        password: 'pass1234'
      })
    );

    if (loginAsync.fulfilled.match(result)) {
      alert('login success.');
    }

    if (loginAsync.rejected.match(result)) {
      alert('login failed.');
    }
  };

  const [login, { isLoading, isError }] = useLoginMutation();

  const rtkLoginHandler = async () => {
    const data = {
      userName: userName,
      password: 'pass1234'
    };

    try {
      const response = await login(data).unwrap();
      alert('login success.');
    } catch (error) {
      alert('login failed.');
    }
  };

  return (
    <div className="App">
      <input
        type="text"
        name="userName"
        placeholder="john"
        value={userName}
        onChange={inputHandler}
      />

      <hr />

      <div>
        <button type="button" onClick={loginHandler}>
          CreateAsyncThunk Login
        </button>

        {loadingStatus === 'loading' ? (
          <div>loading...</div>
        ) : loadingStatus === 'failed' ? (
          <div>failed...</div>
        ) : null}
      </div>

      <hr />

      <div>
        <button type="button" onClick={rtkLoginHandler}>
          RTK Login
        </button>

        {isLoading ? <div>loading...</div> : isError ? <div>failed...</div> : null}
      </div>
    </div>
  );
}

export default App;
