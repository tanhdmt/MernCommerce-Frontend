import { applyMiddleware, compose, createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducer from "./redux/reducers";
import {createWrapper} from 'next-redux-wrapper';
import { HYDRATE } from "next-redux-wrapper";

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.count) nextState.count = state.count; // preserve count value on client side navigation
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, reducer)

let composeEnhancer = compose;
if (typeof window !== 'undefined') {
  composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
const makeStore = (context) => createStore(persistedReducer, composeEnhancer(applyMiddleware(thunk)));

//export const persistor = persistStore(makeStore)
export const wrapper = createWrapper(makeStore, {debug: true});
