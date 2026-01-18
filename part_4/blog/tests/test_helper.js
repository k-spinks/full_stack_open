const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Testing blog 1",
    author: "John Doe",
    url: "https://testingurl",
    likes: 5
  },
  {
    title: "Testing blog 2",
    author: "Jane Doe",
    url: "https://notrealurl",
    likes: 30
  },
  {
    title: "Testing blog 3",
    author: "Amy Doe",
    url: "https://fakeurl",
    likes: 12
  }
]

const nonExistingId = async () => {
  const blog = new Blog({content: "willremovethissoon"})
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}