// Imports: Dependencies
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; 

/* Import all reducers */
import settingsReducer from './reducers/settingsReducer';

  
// Combine reducers
const rootReducer = combineReducers({
    settings: settingsReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

// Exports
export default store;