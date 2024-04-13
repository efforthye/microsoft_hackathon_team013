import axios from 'axios';
import { useEffect, useState } from 'react';

export const useMain = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('').then((res) => {
      setData(res.data);
    });
  }, []);

  return { data };
};
