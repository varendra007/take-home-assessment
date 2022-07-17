import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './reset.css'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

async function prepare() {
  if (import.meta.env.DEV) {
    return import('./mocks/browser').then(({ default: mocks }) => {
      return mocks.start()
    })
  }
}

prepare().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.Fragment>
      <App />
    </React.Fragment>,
  )
})
