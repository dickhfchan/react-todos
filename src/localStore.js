const set = (keyName, keyValue) => {
  localStorage.setItem(keyName, JSON.stringify(keyValue));
};
const get = (keyName, isString) => {
  const data = localStorage.getItem(keyName);
  if (isString) {
    return data;
  }
  return JSON.parse(data);
};
const remove = (keyName) => {
  localStorage.removeItem(keyName);
};
const clear = () => {
  localStorage.clear();
};

const store = { set, get, remove, clear }

export default store;
