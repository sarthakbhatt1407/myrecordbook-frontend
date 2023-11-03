import { createStore } from "redux";
const defaultState = {
  userId: "",
  userEmail: "",
  isLoggedIn: "",
};
const storeReducer = (state = defaultState, action) => {
  if (action.type === "login") {
    const data = action.data;
    localStorage.setItem("userData", JSON.stringify(data));
    return {
      ...state,
      userId: data.userId,
      userEmail: data.userEmail,
      isLoggedIn: true,
    };
  }
  if (action.type === "logout") {
    localStorage.clear();
    return { ...defaultState };
  }

  return state;
};
const reduxStore = createStore(storeReducer);

export default reduxStore;
