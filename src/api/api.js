import axios from 'axios';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post('/369/user/signup', userData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response.data;
    } catch (error) {
    
        throw error;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post('/369/user/login', credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // 로그인 성공 시 JWT 토큰을 로컬 스토리지에 저장
        if (response.data && response.data.token) {
            localStorage.setItem('userToken', response.data.token);
        }
        return response.data;
    } catch (error) {
        // 로그인 실패 시 에러 처리
        throw error;
    }
};

export const updateUser = async (userId, updateData) => {
  // 회원정보 수정 요청 로직
};
