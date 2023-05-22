import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {greenApi, ResponseMessageType, ResponsePhotoType} from "../../api/greenApi";


export const setMessageWhat = createAsyncThunk('green/setMessageWhat', async (param:{phone:string, message:string}, thunkAPI) => {
    try {
        const res = await greenApi.sendMsg(param.phone,param.message);
        console.log(res)
        return
    } catch (err) {
        const error: AxiosError = err as AxiosError;
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})
export const getChatHistory = createAsyncThunk('green/getChatHistory', async (param:{phone:string}, thunkAPI) => {
    try {
        const res = await greenApi.getAllMsg(param.phone);
        thunkAPI.dispatch(setChatHistory(res.data))
        return {chatHistory: res.data}
    } catch (err) {
        const error: AxiosError = err as AxiosError;
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})
export const getAvatar = createAsyncThunk('green/getChatHistory', async (param:{phone:string}, thunkAPI) => {
    try {
        const res = await greenApi.getPhotoUser(param.phone);
        thunkAPI.dispatch(setAvatar(res.data))
        return {avatar: res.data.urlAvatar}
    } catch (err) {
        const error: AxiosError = err as AxiosError;
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})

export const asyncAction = {
    setMessageWhat,
    getChatHistory,
    getAvatar,
}

export const slice = createSlice({
    name: 'green',
    initialState: <InitialStateType>{
        chatHistory: [],
        phone: '',
        avatar:''
    },
    reducers: {
        setChatHistory(state, action: PayloadAction<ResponseMessageType>) {
            state.chatHistory = action.payload
        },
        setPhoneAbonent(state, action: PayloadAction<{}>) {
            const phone = localStorage.getItem('phone')
            state.phone = phone !== null ? phone : '';
        },
        setAvatar(state, action: PayloadAction<ResponsePhotoType>) {
            state.avatar = action.payload.urlAvatar
        },
    },
})

export const green = slice.reducer;

export const {
    setChatHistory,
    setPhoneAbonent,
    setAvatar,
} = slice.actions


type InitialStateType = {
    chatHistory: ResponseMessageType,
    phone: string
    avatar:string
}