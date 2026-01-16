// Imports express router from express and Blog schema from mongoose
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// GET route to find all blog posts
blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

// POST route to add a new blog post
blogsRouter.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

module.exports = blogsRouter