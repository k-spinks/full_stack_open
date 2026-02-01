import { useState } from "react"
const Blog = ({blog, increaseLike }) => {

  const {id, title, author, url, likes} = blog
  const [isVisible, setIsVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleAddLike = () => {
    increaseLike(id)
  }

  return (
  <div style={blogStyle}>
    <div>
      <div>
      {title}
      <button onClick={() => setIsVisible((prev) => !prev)}> {isVisible ? 'Hide' : 'View'} </button>
      </div>
      <div>
        {isVisible && (
          <div>
            <p>{author}</p>
            <a href="#" target="_blank">{url}</a>
            <p>Likes: {likes}
              <button onClick={handleAddLike}>Like</button>
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
  )
}

export default Blog