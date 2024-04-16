import styles from './styles.module.scss';
import { useState, ChangeEvent, useEffect } from 'react';
import { BsQuestionSquareFill } from 'react-icons/bs';
import { BsFillChatLeftTextFill } from 'react-icons/bs';
import axios from 'axios';

const CursorSVG = () => {
  return (
    <svg className={styles.cursor} viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='15' cy='15' r='15' />
    </svg>
  );
};

const App = () => {
  const title = 'E프레임마법사';

  const [inputValue, setInputValue] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [chatHistory, setChatHistory] = useState([{ user: 'AI', content: '' }]);
  const [displayResponse, setDisplayResponse] = useState('');
  const [completedTyping, setCompletedTyping] = useState(true);

  // input 값이 변경될 때마다 호출되는 함수
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value); // 입력값을 state에 반영합니다.

  const onClick = async () => {
    setQuestion(inputValue);
    setInputValue('');

    setChatHistory([...chatHistory, { user: 'AI', content: 'AI가 답변중입니다...' }]);

    // const ip = 'http://13.124.93.106:8080';
    const ip = 'http://10.104.195.220:8080';

    const englishResult = await axios.get(`${ip}/api/test`, {
      params: {
        text: inputValue,
      },
    });

    const englishResultData = englishResult.data.data.choices.map((choice: any) => choice.message.content).join('\n');

    const res = (
      await axios.get(`${ip}/api/translate`, {
        params: {
          text: englishResultData,
        },
      })
    ).data;

    const data = await res.data[0].translations.map((choice: any) => choice.text).join('\n');
    const resultText = `안녕하세요.\n표준프레임워크센터 AI입니다.\n\n${data}\n\n감사합니다.`;
    setChatHistory([...chatHistory, { user: 'User', content: resultText }]);
  };

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
          <div className={styles.title}>전자 정부 표준 프레임워크 Search AI</div>
          <div className={styles.article}>
            <div className={styles.questionbox}>
              <div className={styles.icon}>
                <BsQuestionSquareFill size={40} color='orange' className={styles.icon} />
              </div>
              <input
                type='text'
                value={inputValue}
                onChange={handleChange}
                placeholder='여기에 입력하세요'
                className={styles.inputField}
              />

              <button className={styles.submit} onClick={onClick} disabled={!inputValue || !completedTyping}>
                검색
              </button>
            </div>
            <div className={styles.yourQuestionContainer}>
              <div className={styles.icon} />
              <div className={styles.yourQuestion}>{question}</div>
            </div>
            <hr className={styles.line} />
            <div className={styles.answer}>
              <div className={styles.icon}>
                <BsFillChatLeftTextFill size={40} color='green' />
              </div>
              <span className={styles.displayResponse}>
                {displayResponse}
                {!completedTyping && <CursorSVG />}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
