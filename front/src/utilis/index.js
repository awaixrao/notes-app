export const getToken = () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    return token;
  }
  return null;
};

export const removeToken = () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    localStorage.removeItem("accesstoken");
  }
  return null;
};
