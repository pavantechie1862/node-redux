const { createStore, applyMiddleware } = require("redux");
const thunk = require("redux-thunk").default;
const axios = require("axios");

const apiStatusConstants = {
  progress: "Progress",
  success: "SUCCESS",
  failure: "FAILURE",
};

//state
const initialState = {
  apiStatus: apiStatusConstants.progress,
  data: [],
  errorMsg: null,
};

//actions
const onApiSuccess = (users) => {
  return {
    type: apiStatusConstants.success,
    data: users,
  };
};

const onApiFailure = (error) => {
  return {
    type: apiStatusConstants.failure,
    data: error,
  };
};

const onApiProgress = () => {
  return {
    type: apiStatusConstants.progress,
    data: [],
  };
};

//reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case apiStatusConstants.success:
      return {
        ...state,
        apiStatus: apiStatusConstants.success,
        data: action.data,
      };
    case apiStatusConstants.failure:
      return {
        ...state,
        apiStatus: apiStatusConstants.failure,
        errorMsg: action.errorMsg,
        data: [],
      };
    case apiStatusConstants.progress:
      return {
        ...state,
        apiStatus: apiStatusConstants.progress,
        errorMsg: "",
        data: [],
      };
    default:
      return state;
  }
};

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(onApiProgress());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        let users = response.data.map((each) => each.id);
        dispatch(onApiSuccess(users));
      })
      .catch((error) => {
        dispatch(onApiFailure(error));
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunk));
store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchUsers());
