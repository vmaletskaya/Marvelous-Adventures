import md5 from 'md5';
const privateKey = 'e27c3303d1d6a2d6ecf0910aebed16d48ef484c8';
const publicKey = 'b7305ee923b3f91059c7ce382c6f1f42';
const ts = Date.now();

const data = {
  ts,
  apikey: publicKey,
  hash: md5(ts + privateKey + publicKey),
};
const header = { Accept: '*/*' };

const options = {
  params: data,
  headers: header,
};

export default options