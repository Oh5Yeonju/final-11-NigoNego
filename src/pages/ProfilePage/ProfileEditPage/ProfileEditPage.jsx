import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../../../atom/atoms';
import {
  Wrapper,
  HeadingWrapper,
  FormWrapper,
  ImageWrapper,
  // BtnWrapper,
} from './ProfileEditStyle';
import { HeaderEditdNav } from '../../../components/common/Header/Header';
import Input from '../../../components/common/Input/Input';
// import { LBtn, LdisabledBtn } from '../../../components/common/button/Button';
import { LImage } from '../../../components/common/UserImage/UserImage';
import basicImg from '../../../assets/images/basic-profile-img.png';
// import UploadButton from '../../../components/common/button/UploadButton';
import SlideModal from '../../../components/common/Modal/SlideModal';

export default function ProfileEditPage() {
  const [userName, setUserName] = useState('');
  const [userID, setUserID] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [userIntro, setUserIntro] = useState(false);
  const [isUserNameValid, setIsUserNameValid] = useState(false);
  const [isUserIDValid, setIsUserIDValid] = useState(false);
  const [errorMessageID, setErrorMessageID] = useState('');

  const navigate = useNavigate();
  const auth = useRecoilValue(authAtom);

  const handleUserNameChange = e => {
    setUserName(e.target.value);
  };

  const handleUserIDChange = e => {
    const newUserID = e.target.value;
    setUserID(newUserID);
    setIsUserIDValid(false); // ID 변경 시에 isUserIDValid 상태를 초기화합니다.
    if (/^[a-zA-Z0-9]+$/.test(newUserID)) {
      setErrorMessageID(''); // 유효한 ID인 경우 오류 메시지를 초기화합니다.
    }
  };

  const handleUserIntro = e => {
    setUserIntro(e.target.value);
  };

  const handleNameValid = () => {
    if (userName.length >= 2 && userName.length <= 10) {
      setIsUserNameValid(true);
    } else {
      setIsUserNameValid(false);
    }
  };
  const handleIdValid = async () => {
    const testID = /^[a-zA-Z0-9]+$/.test(userID);

    if (testID) {
      try {
        const res = await axios.post(
          'https://api.mandarin.weniv.co.kr/user/accountnamevalid',
          {
            user: {
              accountname: userID,
            },
          },
        );
        if (res.data.message === '이미 가입된 계정ID 입니다.') {
          setIsUserIDValid(false);
          // setIsFormValid(false);

          setErrorMessageID('이미 사용 중인 ID 입니다.');
          console.log(res.data);
        } else {
          setIsUserIDValid(true);
          console.log(res);
          setIsFormValid(true);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsUserIDValid(false);
      setIsFormValid(false);

      setErrorMessageID('*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (isUserNameValid && isUserIDValid) {
      setIsFormValid(true);
      // 다음 단계로 진행하는 로직 추가
      try {
        // API 요청 보내기
        const response = await axios.put(
          'https://api.mandarin.weniv.co.kr/user',
          {
            user: {
              username: userName,
              accountname: userID,
              intro: userIntro,
              image: '',
            },
          },
          {
            headers: {
              Authorization: `Bearer ${auth}`,
              'Content-type': 'application/json',
            },
          },
        );

        // 성공적으로 요청을 처리한 후의 로직 추가
        console.log('프로필 수정 성공:', response.data);
      } catch (error) {
        // API 요청 실패 처리
        // 여기에 ID 혹은 Name 중복입니다 추가
        console.error('API 요청 실패:', error);
        setIsUserNameValid(true);
      }
      navigate('/myprofile');
    } else {
      setIsFormValid(false);
    }
  };

  return (
    <Wrapper>
      <HeaderEditdNav
        content="저장"
        isFormValid={isFormValid}
        handleSave={handleSubmit}
      />
      <HeadingWrapper>
        <h1>프로필 설정</h1>
        <p>나중에 언제든지 변경할 수 있습니다.</p>
      </HeadingWrapper>
      <ImageWrapper>
        <LImage src={basicImg} />
        {/* <UploadButton /> */}
      </ImageWrapper>
      <form onSubmit={handleSubmit}>
        <FormWrapper>
          <Input
            label="사용자이름"
            type="text"
            id="user-name"
            name="user-name"
            placeholder="2~10자 이내"
            value={userName}
            onChange={handleUserNameChange}
            onBlur={handleNameValid}
          />
          <Input
            label="계정ID"
            type="text"
            id="user-ID"
            name="user-ID"
            placeholder="영문, 숫자 특수문자만 사용가능"
            value={userID}
            onChange={handleUserIDChange}
            onBlur={handleIdValid}
            errorMessage={errorMessageID}
          />
          <Input
            label="소개"
            type="text"
            id="user-intro"
            name="user-intro"
            value={userIntro}
            onChange={handleUserIntro}
            placeholder="자신과 판매할 상품에 대해 소개"
          />
        </FormWrapper>
      </form>
    </Wrapper>
  );
}
