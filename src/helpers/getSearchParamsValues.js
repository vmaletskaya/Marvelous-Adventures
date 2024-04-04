// export default function getObjFromParams(searchParams) {
//   const params = Object.fromEntries(searchParams.entries());

//   return params;
// }


const getObjFromParams = (searchParams) => {
  if (!searchParams) {
    return {};
  }
  
  const params = Object.fromEntries(searchParams.entries());

  return params;
}

export default getObjFromParams;