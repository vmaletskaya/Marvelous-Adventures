import axios from 'axios';
import options from './options';
import { filteredQuery, getObjFromParams, findTitle } from 'helpers';

const instance = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public',
  ...options,
});

const fetchLastComics = async () => {
  const params = new URLSearchParams({
    orderBy: '-focDate',
    startYear: '2022',
    format: 'comic',
    noVariants: 'true',
    hasDigitalIssue: 'true',
    limit: '12',
  });
  const res = await instance.get(`/comics?${params}`);
  return res.data.data;
};

const fetchAllComics = async searchParams => {
  const searchedValues = filteredQuery(getObjFromParams(searchParams));

  const defaultParams = {
    orderBy: '-focDate',
    format: 'comic',
    limit: 16,
  };

  const title = searchParams.title ? findTitle(searchedValues) : null;
  const paramsToSearch = filteredQuery({
    title,
    ...defaultParams,
    ...searchedValues,
  });

  const offset = Number(paramsToSearch.page) * Number(paramsToSearch.limit);

  delete paramsToSearch.page;

  const params = new URLSearchParams(paramsToSearch);

  const res = await instance.get(
    `/comics?${params}&offset=${offset}&noVariants=true`
  );

  return res.data.data;
};

export { fetchLastComics, fetchAllComics };
