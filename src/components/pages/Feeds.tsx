import React, { UIEvent, useEffect, useReducer } from 'react'
import { makeStyles } from '@mui/styles'
import Post from './../post'
import Loader from '../loader'
import { useQuery } from 'react-query'

const useStyles = makeStyles({
  rootContainer: {
    height: '90vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'auto',
    position: 'absolute',
    bottom: 0,
    marginTop: '10vh',
  },
  errorContainer: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const HANDLE_PAGE = 'HANDLE_PAGE'
const HANDLE_FEEDS = 'HANDLE_FEEDS'
const HANDLE_NEXT_PAGE = 'HANDLE_NEXT_PAGE'
const HANDLE_TOTAL = 'HANDLE_TOTAL'
const HANDLE_ISBOTTOMREACHED = 'HANDLE_ISBOTTOMREACHED'

type postType = {
  id: string
  title: string
  post: string
  user: string
  createdAt: Date
  avatar: string
  hasNext: boolean
  total: number
}

const feedsReducer = (state: any, action: any) => {
  if (state.total - state.feeds.length < state.num) {
    state = { ...state, num: state.total - state.feeds.length }
  }
  if (action.type === HANDLE_ISBOTTOMREACHED) {
    return { ...state, isBottomReached: action.value }
  }
  if (action.type === HANDLE_PAGE) {
    return { ...state, page: action.value }
  }
  if (action.type === HANDLE_FEEDS) {
    let newFeeds = action.value
    return { ...state, feeds: [...state.feeds, ...newFeeds] }
  }
  if (action.type === HANDLE_NEXT_PAGE) {
    return { ...state, hasNext: action.value }
  }
  if (action.type === HANDLE_TOTAL) {
    return { ...state, total: action.value }
  }
  return {
    ...state,
  }
}
const Feeds = () => {
  const classes = useStyles()
  const [feedState, dispatchFeeds] = useReducer(feedsReducer, {
    feeds: [],
    num: 20,
    page: 1,
    hasNext: true,
    total: Number.MAX_VALUE,
    initializer: true,
    isBottomReached: false,
  })

  // Setting up fetch logic using reac-query
  const { refetch, isFetching, isError, error } = useQuery(
    'feeds',
    () =>
      fetch(`http://localhost:8080/api/posts?page=${page}&num=${num}`)
        .then(response => response.json())
        .then(res => {
          let data = res.results.map((el: postType, ind: number) => ({
            id: el.id,
            title: el.title,
            post: el.post,
            user: el.user,
            createdAt: new Date(el.createdAt),
            avatar: el.avatar,
          }))
          dispatchFeeds({ type: HANDLE_TOTAL, value: res.total })
          dispatchFeeds({ type: HANDLE_FEEDS, value: data })
          dispatchFeeds({ type: HANDLE_NEXT_PAGE, value: res.hasNext })
          dispatchFeeds({ type: HANDLE_PAGE, value: page + 1 })
        }),
    { retry: false },
  )

  // Destructing states from feedState Reducer
  const { feeds, num, page, hasNext, isBottomReached } = feedState

  // Fetching the data again using refetch() function of useQuery when the list is not empty i.e hasNext===true and
  // bottom of the page is reached i.e auto refetching the posts upon reaching the end of page
  useEffect(() => {
    if (hasNext && isBottomReached) refetch()
  }, [isBottomReached])

  // Checking if bottom of the page is reached or not
  const listRef = React.useRef<HTMLInputElement>(null)
  const handleScroll = (evt: UIEvent<HTMLDivElement>) => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        dispatchFeeds({ type: HANDLE_ISBOTTOMREACHED, value: true })
      } else {
        dispatchFeeds({ type: HANDLE_ISBOTTOMREACHED, value: false })
      }
    }
  }

  // Handling error upon fetching the data
  if (isError && error instanceof Error) {
    return (
      <div className={classes.errorContainer}>
        <h1 style={{ fontSize: '2rem' }}>Something went wrong!</h1>
        <br />
        {error.message}
      </div>
    )
  }

  return (
    <div
      ref={listRef}
      onScroll={handleScroll}
      className={classes.rootContainer}
    >
      <br />
      {feeds.map((el: postType, ind: number) => (
        <Post
          key={el.id}
          avatar={el.avatar}
          user={el.user}
          title={el.title}
          post={el.post}
          createdAt={`${el.createdAt.toDateString()}`}
        />
      ))}
      {isFetching && <Loader />}
    </div>
  )
}

export default Feeds
