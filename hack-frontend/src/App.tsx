import styles from './styles.module.scss';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { BsQuestionSquareFill } from 'react-icons/bs';
import { BsFillChatLeftTextFill } from 'react-icons/bs';

const CursorSVG = () => {
  return (
    <svg className={styles.cursor} viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='15' cy='15' r='15' />
    </svg>
  );
};

const App = () => {
  const title = '전자 정보 표준 프레임워크 search AI';

  const [inputValue, setInputValue] = useState<string>('');

  // input 값이 변경될 때마다 호출되는 함수
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // 입력값을 state에 반영합니다.
  };

  const text = `webmaster계정에 로그인이 되지 않는 이유는\nwebmaster에게 권한이 없기 때문입니다.

해결방법으로는\n

1. INSERT를 이용하여 webmaster에게 권한을 줍니다.
INSERT INTO COMTNEMPLYRSCRTYESTBS (SCRTY_DTRMN_TRGET_ID, MBER_TY_CODE, AUTHOR_CODE) VALUES ('USRCNFRM_99999999999', 'USR03', 'ROLE_ADMIN');

2.TEST1로 로그인하신 뒤
보안> 70. 권한그룹관리에서 webmaster에게 관리자 권한을 주신 뒤 등록을 해주시면 됩니다.

추후 차기버전에 반영하도록 하겠습니다.
감사합니다.`;

  const [chatHistory, setChatHistory] = useState([{ user: 'AI', content: text }]);
  const [displayResponse, setDisplayResponse] = useState('');
  const [completedTyping, setCompletedTyping] = useState(true);

  useEffect(() => {
    setCompletedTyping(false);

    let i = 0;
    const stringResponse = chatHistory[chatHistory.length - 1].content;

    const intervalId = setInterval(() => {
      setDisplayResponse(stringResponse.slice(0, i));

      i++;

      if (i > stringResponse.length) {
        clearInterval(intervalId);
        setCompletedTyping(true);
      }
    }, 60);

    return () => clearInterval(intervalId);
  }, [chatHistory]);

  return (
    <div className={styles.container}>
      {/* 큰 페이지 제목 */}
      <h1 className={styles.pageTitle}>{title}</h1>

      <div className={styles.containerBox}>
        {/* 나머지 입력 요소들 */}
        <br />
        <br />
        <div className={styles.inputContainer}>
          {/* 메인 */}
          <div className={styles.board_detail03}>
            <div className={styles.title}>표준프레임워크 개발환경 및 실행환경 JDK 버전</div>
            <div className={styles.info}></div>
            <div className={styles.article}>
              <div className={styles.questionbox}>
                <h4 className={styles.question}>
                  <BsQuestionSquareFill size={40} color='orange' className={styles.icon} />

                  <input
                    type='text'
                    value={inputValue}
                    onChange={handleChange}
                    placeholder='여기에 입력하세요'
                    className={styles.input_field}
                  />
                </h4>
              </div>
              <div className={styles.answer}>
                <BsFillChatLeftTextFill size={40} color='green' />
                <span className={styles.displayResponse}>
                  {displayResponse}
                  {!completedTyping && <CursorSVG />}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
