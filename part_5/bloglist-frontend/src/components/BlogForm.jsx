import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }


  return (
    <form onSubmit={handleSubmit}>
      <h2>Create blog</h2>
      <div>
        <label htmlFor="blog-title">
          title
          <input
            type="text"
            id="blog-title"
            value={title}
            name="title"
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
      </div>

      <div>
        <label htmlFor="blog-author">
          author
          <input
            type="text"
            id="blog-author"
            value={author}
            name="author"
            onChange={(event) => setAuthor(event.target.value)}
          />
        </label>
      </div>

      <div>
        <label htmlFor="blog-url">
          url
          <input
            type="text"
            id="blog-url"
            value={url}
            name="url"
            onChange={(event) => setUrl(event.target.value)}
          />
        </label>
      </div>

      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
