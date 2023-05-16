import type { Store } from 'redux'
import { 
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware
} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'
import { composeWithDevTools } from '@redux-devtools/extension'
import menuReducer from './modules/menu/reducer'
import breadcrumbReducer from './modules/breadcrumb/reducer'

const reducer = combineReducers({
  menu: menuReducer,
  breadcrumb: breadcrumbReducer
})

const persistConfig = {
  key: 'redux-persist',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducer)

const middleWares = applyMiddleware(reduxThunk, reduxPromise)

const store: Store = createStore(persistedReducer, composeWithDevTools(middleWares))

const persistor = persistStore(store)

export { store, persistor }