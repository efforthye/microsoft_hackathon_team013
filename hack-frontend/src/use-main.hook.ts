import axios from 'axios';
import { useEffect, useState } from 'react';

export const useMain = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    axios.get('http://43.201.38.232:8080/api/test').then((res) => {
      setData(res.data.data.choices.map((choice: any) => choice.message.content).join('\n'));
    });
  }, []);

  return { data };
};
