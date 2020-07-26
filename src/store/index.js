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


// Combine reducers
const rootReducer = combineReducers({
    settings: settingsReducer,
    threads: threadsReducer,
    messages: messagesReducer
})

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2
};

const pReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(pReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);