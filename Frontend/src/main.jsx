import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserContext_ from './context/userContext/userContext.jsx'
import PostContext_ from './context/postContext/postContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContext_>
      <PostContext_>
        <App />
      </PostContext_>
    </UserContext_>
  </React.StrictMode>,
)
