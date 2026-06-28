export const getToken = () => localStorage.getItem("task-tracker-token");
export const setToken = (token) => localStorage.setItem("task-tracker-token", token);
export const removeToken = () => localStorage.removeItem("task-tracker-token");
