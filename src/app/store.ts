import {ActionCreatorsMapObject, bindActionCreators, combineReducers, configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import {useAppDispatch} from "../hooks/hooks";
import {useMemo} from "react";
import {green} from "../features/mainPage/green-reducer";


const rootReducer = combineReducers({
    green,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(thunkMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type RootReducerType = typeof rootReducer

export function useActions<Her extends ActionCreatorsMapObject<any>>(actions: Her) {
    const dispatch = useAppDispatch()

    const boundActions = useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])
    return boundActions
}

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;