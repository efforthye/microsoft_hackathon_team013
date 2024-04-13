import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { CopyBlock } from 'react-code-blocks';

interface MessageData {
  message: string;
  imageSrc: string;
}

const App = () => {
  const title = '장애인을 위한 정부 웹 콘텐츠 접근성 지침 이행 AI 검사기';
  const description = `웹페이지 링크 혹은 HTML 태그를 입력하면 웹 콘텐츠 접근성 지침 이행 여부를 확인하실 수 있습니다.\n또한, 해당 페이지 내에 포함된 이미지의 설명을 받아보실 수 있습니다.`;
  const code = `<div className='App'>
  <div className={styles.text}>Main page</div>
  <CopyBlock text={code} language={language} showLineNumbers={props.showLineNumbers} wrapLines />
  <div className={styles.text}>Main page Main page hihihihihih hihi hi </div>
  <div className={styles.text}>Main page</div>
  <img src={logo} alt='logo' />
  <div className={styles.text}>Main page</div>
</div>
`;

  const showLineNumbers = true;
  const highlight = '2-3';

  const language = 'html';

  const [url, setUrl] = useState<string>('');
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [messageData, setMessageData] = useState<MessageData[]>([]);

  const handleInspect = async () => {
    // 백엔드에서 데이터를 가져오는 비동기 함수 호출
    // 데이터 형식: { message: string, imageSrc: string }[]
    const backendData = await fetchBackendData();
    setMessageData(backendData);
  };

  useEffect(() => {
    // 컴포넌트가 마운트되면 handleInspect 함수를 호출하여 초기 데이터를 가져옵니다.
    handleInspect();
  }, []);

  // 백엔드에서 데이터를 가져오는 비동기 함수
  const fetchBackendData = async () => {
    // 예시로 임의의 데이터를 반환합니다.
    return [
      { message: '첫 번째 메시지', imageSrc: 'https://via.placeholder.com/150' },
      { message: '두 번째 메시지', imageSrc: 'https://via.placeholder.com/150' },
      // 추가적인 데이터도 필요에 따라 포함할 수 있습니다.
      //데이터를 받는걸 형식 맞춰서 받아서 넣어주면 될듯해요.
    ];
  };

  return (
    <div className={styles.container}>
      {/* 큰 페이지 제목 */}
      <h1 className={styles.pageTitle}>{title}</h1>
      <div className={styles.description}>{description}</div>

      <hr className={styles.hr} />

      <div className={styles.containerBox}>
        {/* 나머지 입력 요소들 */}
        <br />
        <br />
        <div className={styles.inputContainer}>
          <input
            type='text'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder='웹페이지 링크 입력'
            className={styles.inputField}
          />

          <textarea
            value={htmlContent}
            onChange={(e) => setHtmlContent(e.target.value)}
            placeholder='HTML 입력'
            className={styles.textAreaField}
          />
          <button onClick={handleInspect} className={styles.button} disabled={!url && !htmlContent}>
            검사하기
          </button>
        </div>

        <div className={styles.resultContainer}>
          <CopyBlock
            text={code}
            language={language}
            showLineNumbers={showLineNumbers}
            highlight={highlight}
            wrapLongLines={true}
            customStyle={{ backgroundColor: '#ffdada', width: '1000px', marginBottom: '40px' }}
          />

          {/* 이미지 및 메시지 데이터 출력 */}
          {messageData.map((data, index) => (
            <div key={index} className={styles.imageContainer}>
              <img src={data.imageSrc} alt={`이미지 ${index + 1}`} />
              <p>{data.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
