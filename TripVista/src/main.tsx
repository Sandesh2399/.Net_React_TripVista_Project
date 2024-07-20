import React from 'react'
import '../css/bootstrap.min.css'
import "../css/owl.carousel.min.css"
import "../css/owl.theme.default.min.css"
import "../css/jquery.fancybox.min.css"
import "../fonts/icomoon/style.css"
import "../fonts/flaticon/font/flaticon.css"
import "../css/daterangepicker.css"
import "../css/aos.css"
import "../css/style.css"
import "./assets/vendors/mdi/css/materialdesignicons.min.css"
import "./assets/vendors/ti-icons/css/themify-icons.css"
import "./assets/vendors/css/vendor.bundle.base.css"
import "./assets/vendors/font-awesome/css/font-awesome.min.css"
import "./assets/vendors/font-awesome/css/font-awesome.min.css"
import "./assets/css/style.css"
import "./assets/vendors/bootstrap-datepicker/bootstrap-datepicker.min.css"
import ReactDOM from 'react-dom/client'
import { persistor, Store } from './redux/Store.ts'
import { Provider } from 'react-redux'
import App from './App.tsx'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)
