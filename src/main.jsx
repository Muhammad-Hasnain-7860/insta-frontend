import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoute from './app/router/AppRoute.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store/store.js'
import stepUpInterceptor from './app/config/axiosInterceptor.js'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AppRoute />
  </Provider>
)

stepUpInterceptor(store)