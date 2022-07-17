import React, { useState, UIEvent, useEffect, useReducer } from 'react'
import { makeStyles } from '@mui/styles'
import Post from './../post'
import Loader from '../loader'

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
})

const HANDLE_LOADING = 'HANDLE_LOADING'
const HANDLE_PAGE = 'HANDLE_PAGE'
const HANDLE_FEEDS = 'HANDLE_FEEDS'
const HANDLE_NEXT_PAGE = 'HANDLE_NEXT_PAGE'
const HANDLE_ERROR = 'HANDLE_ERROR'
const HANDLE_TOTAL = 'HANDLE_TOTAL'
const HANDLE_FETCH_ON_REACHING_BOTTOM = 'HANDLE_FETCH_ON_REACHING_BOTTOM'

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
  state = { ...state, initializer: false }
  if (state.total - state.feeds.length < state.num) {
    state = { ...state, num: state.total - state.feeds.length }
  }
  if (action.type === HANDLE_FETCH_ON_REACHING_BOTTOM) {
    return { ...state, isBottomReached: action.value }
  }
  if (action.type === HANDLE_LOADING) {
    return { ...state, isLoading: action.value }
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
  if (action.type === HANDLE_ERROR) {
    return { ...state, isError: action.value }
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
    num: 10,
    page: 1,
    hasNext: true,
    isLoading: false,
    isError: false,
    total: Number.MAX_VALUE,
    initializer: true,
    isBottomReached: false,
  })

  const {
    feeds,
    num,
    page,
    hasNext,
    isLoading,
    isError,
    initializer,
    isBottomReached,
  } = feedState

  const handleFetchPosts = () => {
    if (hasNext && (initializer || isBottomReached)) {
      dispatchFeeds({ type: HANDLE_LOADING, value: true })

      console.log('called', page)
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
          dispatchFeeds({ type: HANDLE_ERROR, value: false })
          dispatchFeeds({ type: HANDLE_LOADING, value: false })
        })
        .catch(err => {
          console.log(err)
          dispatchFeeds({ type: HANDLE_ERROR, value: true })
          dispatchFeeds({ type: HANDLE_LOADING, value: false })
        })
      dispatchFeeds({ type: HANDLE_PAGE, value: page + 1 })
    }
  }
  useEffect(() => {
    console.log(feeds.length)
  }, [feeds])
  useEffect(() => {
    handleFetchPosts()
  }, [isBottomReached])

  const listRef = React.useRef<HTMLInputElement>(null)
  const handleScroll = (evt: UIEvent<HTMLDivElement>) => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        console.log('Reached bottom')
        dispatchFeeds({ type: HANDLE_FETCH_ON_REACHING_BOTTOM, value: true })
      } else {
        dispatchFeeds({ type: HANDLE_FETCH_ON_REACHING_BOTTOM, value: false })
      }
    }
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
      {isLoading && <Loader />}
    </div>
  )
}

export default Feeds
