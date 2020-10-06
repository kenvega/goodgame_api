import changeCase from 'change-case';

const { camelCase } = changeCase;

export default function camelKeys(obj) {
  const res = {};

  Object.keys(obj).forEach(key => {
    res[camelCase(key)] = obj[key];
  });

  return res;
}
