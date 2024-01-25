const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    category : "",
    difficulty: "" , 
    type : "" , 
    amount :""
}

const quizeSlicer = createSlice({
    name:"quize" ,
    initialState , 
    reducers : {
        addCategory : (state , action)=>{
            state.category = action.payload
        } ,

        changeDifficulty : (state , action)=>{
            state.difficulty = action.payload
        },

        chageType : (state , action)=>{
            state.type = action.payload
        },

        changeNumber : (state , action)=>{
            state.amount = action.payload
        }
    }
})



export default  quizeSlicer.reducer 
export const {addCategory , changeDifficulty , chageType , changeNumber} = quizeSlicer.actions