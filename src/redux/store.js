// store.js
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for the web

import todoReducer from './reducers';

const persistConfig = {
    key: 'root',
    storage,
  };

const persistedReducer = persistReducer(persistConfig, todoReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export  { store, persistor };
