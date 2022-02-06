import { applyMiddleware, compose, createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducer from "./redux/reducers";

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

let composeEnhancer = compose;
if (typeof window !== 'undefined') {
  composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
const store = createStore(persistedReducer, composeEnhancer(applyMiddleware(thunk)));

export const persistor = persistStore(store)
export default store;
