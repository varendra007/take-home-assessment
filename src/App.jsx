import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import AppCss from './App.module.css'
import Feeds from './components/pages/Feeds'
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <section className={AppCss.container}>
        <Feeds />
        <div
          style={{
            height: '10vh',
            width: '100vw',
            position: 'fixed',
            top: 0,
            borderBottom: '1px solid #dbdbdb',
            background: '#fafafa',
            zIndex: '+10',
            textAlign: 'center',
            letterSpacing: '3px',
          }}
        >
          <br />
          <span
            style={{
              lineHeight: '1rem',
              letterSpacing: '2px',
              fontWeight: 'bold',
              fontSize: '22px',
            }}
          >
            Single page Feed App
          </span>{' '}
          <br />
          <p style={{ paddingTop: '10px' }}>
            Auto fetch post on reaching bottom of page.
          </p>
        </div>
      </section>
    </QueryClientProvider>
  )
}

export default App
