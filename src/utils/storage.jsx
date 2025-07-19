export const saveToLocal = (data) => {
  localStorage.setItem("editor-content", data);
};

export const loadFromLocal = () => {
  return localStorage.getItem("editor-content");
};
