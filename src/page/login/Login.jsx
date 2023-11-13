import React, { useState } from 'react';
import styled from 'styled-components'; // 이 줄을 추가하세요
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../../store/authSlice';
import { loginUser } from '../../api/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = await loginUser({ email, password });
      dispatch(loginSuccess(userData.token)); // 로그인 성공 시
    } catch (error) {
      dispatch(loginFailure(error.message)); // 로그인 실패 시
    }
  };

  return (
    <LoginPageContainer>
      <h2>로그인</h2>
      <LoginForm onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">로그인</Button>
      </LoginForm>
    </LoginPageContainer>
  )
};

export default LoginPage;

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;