const Blog = require('../models/blog')
const User = require('../models/user')

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

const initialUser = {
    username: "root",
    name: "Test user",
    password: "testingpassword"
  }

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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}


module.exports = {
  initialUser,
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
}