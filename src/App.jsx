import React from 'react'
import { makeStyles } from '@mui/styles'
import { QueryClient, QueryClientProvider } from 'react-query'
import AppCss from './App.module.css'
import Feeds from './components/pages/Feeds'

const useStyles = makeStyles({
  header: {
    height: '10vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    borderBottom: '1px solid #dbdbdb',
    background: '#fafafa',
    zIndex: '+10',
    textAlign: 'center',
    letterSpacing: '3px',
  },
  headerTitle: {
    lineHeight: '1rem',
    letterSpacing: '2px',
    fontWeight: 'bold',
    fontSize: '22px',
  },
})
const queryClient = new QueryClient()

function App() {
  const classes = useStyles()
  return (
    <QueryClientProvider client={queryClient}>
      <section className={AppCss.container}>
        <Feeds />
        {/* Header */}
        <div className={classes.header}>
          <br />
          <span className={classes.headerTitle}>Single page Feed App</span>{' '}
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
