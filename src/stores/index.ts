import type { Store } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
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

const persistConfig = {
  key: 'redux-persist',
  storage
}

const store: Store = configureStore({
  reducer: {
    menu: persistReducer(persistConfig, menuReducer),
    breadcrumb: persistReducer(persistConfig, breadcrumbReducer),
    tags: persistReducer(persistConfig, tagsSlice)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }),
  devTools: true
})

const persistor = persistStore(store)

export { store, persistor }