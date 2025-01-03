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
