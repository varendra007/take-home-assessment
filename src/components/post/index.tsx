import React, { useReducer } from 'react'
import {
  IoPaperPlaneOutline,
  RiShareForwardLine,
  FaRegComments,
  AiOutlineHeart,
  AiFillHeart,
} from 'react-icons/all'
import MouseOverPopover from './../popover'
import useStyles from './styles'

interface propsInterface {
  title: string
  post: string
  user: string
  createdAt: string
  avatar: string
}
enum postActionKind {
  HANDLE_LIKE = 'HANDLE_LIKE',
  HANDLE_COMMENT = 'HANDLE_COMMENT',
}

interface postStateInterface {
  addComment: string
  isLiked: boolean
  countLikes: number
}
const postReducer = (state: postStateInterface, action: any) => {
  if (action.type === postActionKind.HANDLE_COMMENT) {
    return { ...state, addComment: action.value }
  }
  if (action.type === postActionKind.HANDLE_LIKE) {
    let newCountLikes = state.countLikes
    if (state.isLiked) {
      newCountLikes--
    } else {
      newCountLikes++
    }
    return { ...state, isLiked: !state.isLiked, countLikes: newCountLikes }
  }
  return { ...state }
}
const Post = ({ user, title, post, createdAt, avatar }: propsInterface) => {
  const classes = useStyles()

  const [postState, dispatchPost] = useReducer(postReducer, {
    addComment: '',
    isLiked: false,
    countLikes: 0,
  })
  const { isLiked, addComment } = postState

  const handleComment = (evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value)
    dispatchPost({
      type: postActionKind.HANDLE_COMMENT,
      value: evt.target.value,
    })
  }
  const handleLike = () => {
    dispatchPost({ type: postActionKind.HANDLE_LIKE })
  }
  return (
    <div className={classes.rootContainer}>
      {/* Post header */}
      <div className={classes.header}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img src={avatar} className={classes.userImage} />
          <div className={classes.userName}>{user}</div>
        </div>
        <div className={classes.createdAt}>{createdAt}</div>
      </div>

      {/* Post body */}
      <div className={classes.body}>
        <span className={classes.title}>{title}</span>
        <br />

        {post}
      </div>

      {/* Action Container */}
      <div className={classes.actionContainer}>
        <div onClick={handleLike}>
          {isLiked ? (
            <MouseOverPopover
              icon={
                <AiFillHeart
                  style={{ color: '#FA383E' }}
                  className={classes.actionBtns}
                />
              }
              btnName='Dislike'
            />
          ) : (
            <MouseOverPopover
              icon={<AiOutlineHeart className={classes.actionBtns} />}
              btnName='Like'
            />
          )}
        </div>

        <MouseOverPopover
          icon={<FaRegComments className={classes.actionBtns} />}
          btnName='Comments'
        />

        <MouseOverPopover
          icon={<RiShareForwardLine className={classes.actionBtns} />}
          btnName='Share'
        />
        <MouseOverPopover
          icon={<IoPaperPlaneOutline className={classes.actionBtns} />}
          btnName='Send'
        />
      </div>

      {/* Add comment section */}
      <div>
        <form
          className={classes.addCommentContainer}
          onSubmit={e => {
            e.preventDefault()
          }}
        >
          <input
            placeholder='Add a comment'
            className={classes.addComment}
            onChange={handleComment}
          />
          <div
            className={`${classes.postBtn} ${
              addComment.length != 0 && classes.postBtnActive
            }`}
          >
            Post
          </div>
        </form>
      </div>
    </div>
  )
}

export default Post
