import { BallTriangle } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div
      style={{
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <BallTriangle color='#FA383E' height={80} width={80} />
      <br />
      Loading ...
      <br />
    </div>
  )
}

export default Loader
