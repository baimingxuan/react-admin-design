import type { Store } from 'redux'
import { configureStore, type ThunkAction, type Action } from '@reduxjs/toolkit'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import appSlice from './modules/app'
import menuSlice from './modules/menu'
import tagsSlice from './modules/tags'
import userSlice from './modules/user'

const persistConfig = {
  key: 'redux-persist',
  storage
}

export const store: Store = configureStore({
  reducer: {
    app: persistReducer(persistConfig, appSlice),
    menu: persistReducer(persistConfig, menuSlice),
    tags: persistReducer(persistConfig, tagsSlice),
    user: persistReducer(persistConfig, userSlice)
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools: true
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
