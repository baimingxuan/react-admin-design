import type { Store } from 'redux'
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import menuReducer from './modules/menuSlice'
import breadcrumbReducer from './modules/breadcrumbSlice'
import tagsSlice from './modules/tagsSlice'
import userSlice from './modules/userSlice'

const persistConfig = {
  key: 'redux-persist',
  storage
}

export const store: Store = configureStore({
  reducer: {
    menu: persistReducer(persistConfig, menuReducer),
    breadcrumb: persistReducer(persistConfig, breadcrumbReducer),
    tags: persistReducer(persistConfig, tagsSlice),
    user: persistReducer(persistConfig, userSlice)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }),
  devTools: true
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
