const Notification = ({ message , error }) => {
  if(!message) return

  return (
    <div className={`notification ${error ? `notification-error` : `notification-success`}`}>
      <h1>{message}</h1>
    </div>
  )
}

export default Notification