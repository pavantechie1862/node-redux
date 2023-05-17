const { createStore, combineReducers, applyMiddleware } = require("redux");
const logger = require("redux-logger").default;

//state
const laptopStore = {
  noOfLaptops: 100,
};

const mobileStore = {
  noOfMobiles: 1000,
};

//action
const buyLaptop = () => {
  return {
    type: "BUY_LAPTOP",
  };
};

const buyMobile = () => {
  return {
    type: "BUY_MOBILE",
  };
};

//reducer
const laptopReducer = (state = laptopStore, action) => {
  switch (action.type) {
    case "BUY_LAPTOP":
      return { noOfLaptops: state.noOfLaptops - 1 };
    default:
      return state;
  }
};

const mobileReducer = (state = mobileStore, action) => {
  switch (action.type) {
    case "BUY_MOBILE":
      return { noOfMobiles: state.noOfMobiles - 1 };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  mobiles: mobileReducer,
  laptops: laptopReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger));
store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(buyLaptop());
