import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    users : localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [],
}

const ProfileSlice = createSlice({
    name : 'profile',
    initialState : initialState,
    reducers : {
        setUsers(state,value){
            state.users = value.payload;
        }
    }
})


export const {setUsers} = ProfileSlice.actions;
export default ProfileSlice.reducer;