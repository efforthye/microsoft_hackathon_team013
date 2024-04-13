import styles from './styles.module.scss';
import React, { useState, ChangeEvent } from 'react';
import { BsQuestionSquareFill } from "react-icons/bs";
import { BsFillChatLeftTextFill } from "react-icons/bs";

const App = () => {
  const title = '전자 정보 표준 프레임워크 search AI';

  const [inputValue, setInputValue] = useState<string>('');

  // input 값이 변경될 때마다 호출되는 함수
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // 입력값을 state에 반영합니다.
  };


  return (
    <div className={styles.container}>
      {/* 큰 페이지 제목 */}
      <h1 className={styles.pageTitle}>{title}</h1>



      {/* 메인 */}
      <div className={styles.board_detail03}>
		    <div className={styles.title}>
			    표준프레임워크 개발환경 및 실행환경 JDK 버전
		    </div>
		    <div className={styles.info}>
          <dl>
            <dt>작성자</dt>
            <dd>관리자</dd>
          </dl>
          <dl>
            <dt>작성일자</dt>
            <dd>2024-01-15</dd>
          </dl>
          <dl>
            <dt>조회수</dt>
            <dd>734</dd>
          </dl>
		    </div>
		    <div className={styles.article}>
          <h4 className={styles.question}>
            <BsQuestionSquareFill size={40} color='orange'/>
            
              <input 
                type="text" 
                value={inputValue} 
                onChange={handleChange} 
                placeholder="여기에 입력하세요" 
                className={styles.input_field}
              />
          </h4>
          <div className={styles.answer}>
            <BsFillChatLeftTextFill size={40} color='green'/>

            답변 창
          </div>
        </div>
    </div>





      
      
    </div>
  );
};

export default App;
