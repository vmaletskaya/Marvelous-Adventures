import axios from 'axios';
import md5 from 'md5';


const fetchComics = async () => {
  const publicKey = 'b7305ee923b3f91059c7ce382c6f1f42';
  const privateKey = 'e27c3303d1d6a2d6ecf0910aebed16d48ef484c8';

  const ts = Math.floor(new Date().getTime() / 1000);

  const hashInput = ts + privateKey + publicKey;
  const hash = md5(hashInput);

  const BASE_URL = 'http://gateway.marvel.com/v1/public';

 
  const dateRange = '2022-01-01T00:00:00Z,2022-12-31T23:59:59Z';

  try {
    const response = await axios.get(`${BASE_URL}/comics`, {
      params: {
        ts,
        apikey: publicKey,
        hash: hash,
        dateRange: dateRange  
      }
    });

    if (!response.data || response.data.code !== 200) {
      throw new Error('Oops...something going wrong.Try again later.');
    }

    return response.data.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export default fetchComics;


