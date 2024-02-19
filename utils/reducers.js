const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    category : {General :"9"},
    difficulty: "" , 
    type : "" , 
    amount :"10"
}

const quizeSlicer = createSlice({
    name:"quiz" ,
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

        changeAmount : (state , action)=>{
            state.amount = action.payload
        } ,
        reset :(state , action)=>{
           return state = {
                difficulty:"" , type:"" , amount:"10" , category:{General:"9"}
            }
        },
        getOptions :(state , action)=>{
            return state = {
                ...action.payload
            }
        },

    }
})

const fetchState = {
    result : {
        data : [], 
        isLoading: false,
        Error : {}
    }
}


export const fetchQuiz = createAsyncThunk('fetchData' , async(requestUrl)=>{
    const res = await fetch(requestUrl)
    const data = await res.json()
    return data
})

 const fetchSlicer = createSlice({
    name:"fetchData",
    initialState : fetchState,
    extraReducers : (builder) =>{
        builder.addCase(fetchQuiz.pending , (state)=>{
            state.result.isLoading = true
        })
        .addCase(fetchQuiz.fulfilled , (state , action)=>{
                state.result.data = action.payload.results
                state.result.isLoading = false
        })

        .addCase(fetchQuiz.rejected , (state , action)=>{
            state.result.data = {}
            state.result.isLoading = false
             state.result.Error = action.error.message
        })
    }
})


export const fetchReducer = fetchSlicer.reducer
export const quizeReducer =  quizeSlicer.reducer 
export const {addCategory , changeDifficulty , chageType , changeAmount  ,reset ,getOptions } = quizeSlicer.actions