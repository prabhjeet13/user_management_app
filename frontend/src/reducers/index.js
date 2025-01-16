import ProfileReducer from '../slices/ProfileSlice';
import EditReducer from '../slices/EditSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    profile : ProfileReducer,
    edit : EditReducer,
});
export default rootReducer;