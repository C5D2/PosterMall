import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: !!localStorage.getItem('token'),
  loginError: null, // 로그인 실패 시 에러 메시지를 저장할 필드 추가
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      localStorage.setItem('token', action.payload);
      state.loginError = null; // 로그인 성공 시 에러 메시지 초기화
    },
    loginFailure: (state, action) => {
      state.isLoggedIn = false;
      state.loginError = action.payload; // 로그인 실패 시 에러 메시지 저장
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem('token');
      state.loginError = null; // 로그아웃 시 에러 메시지 초기화
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;