// Imports: Dependencies
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

/* Import all reducers */
import settingsReducer from './reducers/settingsReducer';
import threadsReducer from './reducers/threadsReducer';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import messagesReducer from './reducers/messagesReducer';
import customersReducer from './reducers/customersReducer';
import tagsReducer from './reducers/tagsReducer';
import ordersReducer from './reducers/ordersReducer';


// Combine reducers
const rootReducer = combineReducers({
    settings: settingsReducer,
    threads: threadsReducer,
    messages: messagesReducer,
    customers: customersReducer,
    tags: tagsReducer,
    orders: ordersReducer
})

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2
};

const pReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(pReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);