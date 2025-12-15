const Notification = ({message}) => {
  if(!message) return

  return (
    <div className="notification">
      <h1>{message}</h1>
    </div>
  )
}

export default Notification