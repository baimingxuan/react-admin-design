import type { Store } from 'redux'
import { 
  legacy_createStore as createStore, 
  combineReducers, 
  applyMiddleware, 
  compose 
} from 'redux'
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'
import menuReducer from './modules/menu/reducer'
import breadcrumbReducer from './modules/breadcrumb/reducer'

const reducer = combineReducers({
  menu: menuReducer,
  breadcrumb: breadcrumbReducer
})

const middleWares = applyMiddleware(reduxThunk, reduxPromise)

const store: Store = createStore(reducer, compose(middleWares))

export default store