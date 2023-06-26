import React from 'react';
import styled from 'styled-components';
import { ReactComponent as IconSearch } from '../../../assets/image/IconSearch.svg';
import { ReactComponent as IconArrowLeft } from '../../../assets/image/IconArrowLeft.svg';
import { ReactComponent as IconMoreView } from '../../../assets/image/IconMoreView.svg';

import { MSBtn, ProfileEditMSBtn } from '../button/Button';
import searchIcon from '../../../assets/icons/icon-search.svg';
import {
  ArrowLeft,
  MSBtn,
  ProfileEditMSBtn,
  MoreIconButton,
} from '../button/Button';
import SearchInput from '../Input/SearchInput';
import { useNavigate } from 'react-router-dom';

export function HeaderBasicNav() {
  // 뒤로가기 버튼 구현하기;
  return (
    <HeaderDefaultStyle>
      <IconArrowLeft width="24px" height="24px" />
      <IconMoreView width="24px" height="24px" />
    </HeaderDefaultStyle>
  );
}

export function HeaderSearchNav() {
  return (
    <HeaderDefaultStyle>
      <IconArrowLeft width="24px" height="24px" />
      <div className="inputComponent">
        <SearchInput />
      </div>
    </HeaderDefaultStyle>
  );
}


export function HeaderMainNav() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/search'); // 넘어가고자 하는 페이지의 경로를 설정해주세요
  };

  return (
    <HeaderMainNavStyle>
      <h1>니고네고 피드</h1>

      <Button onClick={handleButtonClick}>
        <Img src={searchIcon} alt="검색 아이콘" />
      </Button>
    </HeaderMainNavStyle>

  );
}

export function HeaderUploadNav({ content }) {
  return (
    <HeaderDefaultStyle>
      <IconArrowLeft width="24px" height="24px" />
      <MSBtn content={content} />
    </HeaderDefaultStyle>
  );
}

export function HeaderEditdNav({ content, isFormValid, handleSave }) {
  return (
    <HeaderDefaultStyle>
      <IconArrowLeft width="24px" height="24px" />
      <ProfileEditMSBtn
        content={content}
        onClick={handleSave}
        disabled={!isFormValid}
      />
    </HeaderDefaultStyle>
  );
}

export function HeaderChatNav({ content }) {
  return (
    <HeaderDefaultStyle>
      <div className="havetitle">
        <IconArrowLeft width="24px" height="24px" />
        <h2>{content}123</h2>
      </div>
      <IconMoreView width="24px" height="24px" />
    </HeaderDefaultStyle>
  );
}

export function HeaderContentdNav({ content }) {
  return (
    <HeaderDefaultStyle>
      <IconArrowLeft width="24px" height="24px" />
      <h2>{content}</h2>
    </HeaderDefaultStyle>
  );
}

// 상단바 기본 style
const HeaderDefaultStyle = styled.div`
  /* box-shadow: inset 0px 0px 3px 1px rgb(0, 38, 255); */
  height: 4.8rem;
  border-bottom: 1px solid var(--basic-border-color);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: static;
  top: 0;
  z-index: 100;
  padding: 0 10px;
  background-color: #fff;
  .inputComponent {
    width: 100%;
    margin-left: 12px;
  }

`;

const Button = styled.button`
  border: none;
`;

const Img = styled.img`
  border: 1px solid black;
  padding: 30px;
`;

const HeaderUploadNavStyle = styled(HeaderDefaultStyle)``;


  .havetitle {
    display: flex;
    align-items: center;
    h2 {
      margin-left: 12px;
    }
  }
`;
