import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    want_to_edit : false,
    editData : localStorage.getItem('editData') ? JSON.parse(localStorage.getItem('editData')) : null,
}

const EditSlice = createSlice({
    name : 'edit',
    initialState : initialState,
    reducers : {
        set_want_to_edit(state,value) {
            state.want_to_edit = value.payload;
        },
        setEditData(state,value) {
            state.editData = value.payload;
        }
    }
})

export const {setEditData,set_want_to_edit} = EditSlice.actions;
export default EditSlice.reducer;