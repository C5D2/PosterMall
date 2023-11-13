import React, { useState } from 'react';
import styled from 'styled-components';
import { registerUser } from '../../api/api'; 

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    phoneNumber: '',
    postCode: '',
    roadAddress: '',
    detailAddress: '',
    userImg: null, // 이미지 파일
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = '유효한 이메일 주소를 입력해주세요.';
      isValid = false;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(formData.password)) {
      tempErrors.password = '비밀번호는 영문자와 숫자의 조합으로 8~20자 이내여야 합니다.';
      isValid = false;
    }

    if (!/^\d{10,11}$/.test(formData.phoneNumber)) {
      tempErrors.phoneNumber = '유효한 전화번호를 입력해주세요.';
      isValid = false;
    }

    if (!formData.roadAddress || !formData.detailAddress) {
      tempErrors.address = '주소를 입력해주세요.';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
  
    const data = new FormData();
    data.append('email', formData.email);
    data.append('name', formData.name);
    data.append('password', formData.password);
    data.append('phoneNumber', formData.phoneNumber);
    data.append('postCode', formData.postCode);
    data.append('roadAddress', formData.roadAddress);
    data.append('detailAddress', formData.detailAddress);
  
    if (formData.userImg instanceof File) {
      data.append('userImg', formData.userImg);
    }
  
    try {
      const response = await axios.post('/369/user/signup', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
  
      setSuccessMessage('회원가입이 완료되었습니다');
    } catch (error) {

    }
  };

  return (
    <RegisterContainer>
      <RegisterForm onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="이메일"
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="이름"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="비밀번호"
        />
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder="전화번호"
        />
        <input
          type="text"
          name="postCode"
          value={formData.postCode}
          onChange={handleInputChange}
          placeholder="우편번호"
        />
        <input
          type="text"
          name="roadAddress"
          value={formData.roadAddress}
          onChange={handleInputChange}
          placeholder="도로명주소"
        />
        {/* 상세주소 입력 필드 */}
        <input
          type="text"
          name="detailAddress"
          value={formData.detailAddress}
          onChange={handleInputChange}
          placeholder="상세주소"
        />
        <input
          type="file"
          name="userImg"
          onChange={handleInputChange}
        />

        {successMessage && <p>{successMessage}</p>}

        {errors.email && <p>{errors.email}</p>}
        {errors.password && <p>{errors.password}</p>}
        {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
        {errors.address && <p>{errors.address}</p>}

         <button type="submit">회원가입</button>
      </RegisterForm>
    </RegisterContainer>
  );
};


export default Register;

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const StyledInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
