const sizeList = {
  full_P: 'portrait_uncanny',
  med_P: 'portrait_medium',
  full_Sq: 'standard_fantastic',
  med_Sq: 'standard_amazing',
  full_Land: 'landscape_incredible',
  med_Land: ' landscape_medium',
};

export default function getImage(url, size) {
  const { path, extension } = url;

  return `${path}/${sizeList[size || "full_P"]}.${extension}`;
}