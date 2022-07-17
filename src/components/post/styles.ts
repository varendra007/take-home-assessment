import { makeStyles } from '@mui/styles'
const useStyles = makeStyles({
  rootContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '500px',
    fontSize: '20px',
    lineHeight: '1.5rem',
    fontFamily: 'Railwey, sans-serif',
    fontWeight: 'normal',
    border: '1px solid #dbdbdb',
    borderRadius: '8px',
    color: '#2b2b2b',
    backgroundColor: '#fefefe',
    marginBottom: '12px',
    '@media (max-width: 550px)': {
      width: '97%',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #dbdbdb',
    padding: '5px 10px',
    fontWeight: 'bold',
    fontSize: '12px',
    lineHeight: '2rem',
    letterSpacing: '1px',
  },
  userImage: {
    height: '30px',
    width: '30px',
    borderRadius: '15px',
    border: '2px solid red',
    marginRight: '5px',
  },
  userName: {
    float: 'right',
  },
  createdAt: {
    display: 'flex',
    alignItems: 'flex-end',
    height: '100%',
    color: '#494c50',
    fontWeight: '500',
  },
  body: {
    padding: '5px 10px 10px',
    fontSize: '1rem',
    borderBottom: '1px solid #dbdbdb',
  },
  title: {
    fontWeight: '600',
    marginBottom: '100px',
    fontSize: '1.3rem',
  },
  actionContainer: {
    // color: '#FA383E',
    color: '#666666',
    display: 'flex',
    justifyContent: 'space-around',
    fontSize: '1.7rem',
    padding: '10px 0',
    borderBottom: '1px solid #dbdbdb',
    transition: 'all 200ms linear 0s',
  },
  addCommentContainer: { display: 'flex', padding: '10px 5px' },
  addComment: { width: '100%', outline: 'none', border: 'none' },
  postBtn: {
    fontSize: '0.8rem',
    textAlign: 'right',
    fontWeight: '600',
    transition: 'all 200ms linear 0s',
    color: '#AAC9FF',
    cursor: 'default',
  },
  postBtnActive: {
    color: '#0095f6',
    cursor: 'pointer',
  },
  actionBtns: {
    transform: 'scale(0.9)',
    transition: 'all 200ms linear 0s',
    fontSize: '1.7rem',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1)',
    },
  },
})

export default useStyles
