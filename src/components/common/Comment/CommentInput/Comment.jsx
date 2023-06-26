import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import userDefaultImage from '../../../../assets/images/basic-profile-img.png';
import { authAtom } from '../../../../atom/atoms';
import { useRecoilValue } from 'recoil';

const CommentWrapper = styled.div`
  width: 100%;
  /* 댓글 컴포넌트 하단 고정할지 안할지 */
  /* position: fixed;
  bottom: 0;
  border-top: solid 0.5px #dbdbdb;
  background-color: white; */
  form,
  input,
  button {
    padding: 8px;
  }

  form {
    width: 100%;
    align-items: center;

    display: flex;
  }

  img {
    width: 36px;
    margin-right: 12px;
  }

  input {
    width: 100%;
    border: 0;
  }

  button {
    flex-basis: 60px;
    color: ${props => (props.disableBtn === '' ? '#c4c4c4' : '#FFA200')};
    border: 0;
  }
`;

export default function CommentInput({
  userId,
  setRecentCommentData,
  getComment,
}) {
  const [comment, setComment] = useState('');
  const auth = useRecoilValue(authAtom);

  const handleCommentChange = event => {
    setComment(event.target.value);
  };
  const isBtnDisable = comment === '';

  useEffect(() => {
    (async () => {
      try {
        const url = 'https://api.mandarin.weniv.co.kr';
        const res = await axios.get(`${url}/user/checktoken`, {
          headers: {
            Authorization: `Bearer ${auth}`,
            'Content-type': 'application/json',
          },
        });
        console.log('검증 성공');
        console.log(res.data);
      } catch (error) {
        console.log('검증 실패');
        console.log(error);
      }
    })();
  }, [auth]);

  const onhandlesubmit = async event => {
    event.preventDefault();
    try {
      const url = 'https://api.mandarin.weniv.co.kr';
      const res = await axios.post(
        `${url}/post/${userId}/comments`,
        {
          comment: {
            content: comment,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${auth}`,
            'Content-type': 'application/json',
          },
        },
      );
      // id 가 undefined 가 나오는데... 이거 앞에서 해결함
      // 여기서 왜 토큰이 안정해졌을까 ...djqt 해결완.. 중괄호 잘써라..
      console.log('댓글 데이터 전송 성공');
      setRecentCommentData(res.data);
      getComment();
      console.log(res.data);
    } catch (error) {
      console.log('댓글 데이터 전송 실패');
      console.log(error);
      console.log(auth);
    }
    setComment('');
  };

  return (
    <CommentWrapper disableBtn={comment}>
      <form onSubmit={onhandlesubmit}>
        <img src={userDefaultImage} alt="유저기본이미지" />
        <input
          type="text"
          name="comment"
          value={comment}
          placeholder="댓글 입력하기..."
          onChange={handleCommentChange}
        />
        <button type="submit" value={comment} disabled={isBtnDisable}>
          게시
        </button>
      </form>
    </CommentWrapper>
  );
}
