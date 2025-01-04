export const storeUserSession = (session) => {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.setItem("userSession", JSON.stringify(session));
  }
};

export const getUserSession = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const jsonSession = JSON.parse(localStorage.getItem("userSession"));
    return jsonSession;
  }
  return null;
};

export const removeUserSession = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.removeItem("userSession");
  }
};

export const storeToken = (token) => {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.setItem("userToken", JSON.stringify(token));
  }
};

export const getToken = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const jsonToken = JSON.parse(localStorage.getItem("userToken"));
    return jsonToken;
  }
  return null;
};

export const removeToken = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.removeItem("userToken");
  }
};
