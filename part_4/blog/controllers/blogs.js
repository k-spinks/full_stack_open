// Imports express router from express and Blog schema from mongoose
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

// GET route to find all blog posts
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})

  response.json(blogs)
})

// POST route to add a new blog post
blogsRouter.post('/', userExtractor, async (request, response) => {
  // Get request information
  const body = request.body

  // Store the results of the decodedToken
  const authorizedUser = request.user
  if(!authorizedUser) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(authorizedUser)

  // If title or url are not provided return an error
  if(!body.title || !body.url) {
    return response.status(400).json({ error: "missing title or url"})
  }

  // Create a new blog from the Blog schema with the id field referencing the user
  const newBlog = new Blog({
    title: body.title,
    author: body.author || user.name,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  })

  // Save new blog to the db
  const savedBlog = await newBlog.save()

  // concat the new blog to the user blog array in the user collection via id
  user.blogs = user.blogs.concat(savedBlog._id)

  // save the user
  await user.save()

  response.status(201).json(savedBlog)
})

// DELETE route for removing a blog post
blogsRouter.delete('/:id', userExtractor, async(request, response) => {
  const authorizedUser = request.user

  const id = request.params.id
  const blog = await Blog.findById(id)

  if(!blog) {
    return response.status(404).json({ error: 'no blog found' })
  }
  if(authorizedUser.toString() !== blog.user.toString()) {
    return response.status(401).json({ error: 'unauthorized user' })
  }

  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

// PUT route for updating a blog post
blogsRouter.put('/:id', async (request, response) => {
  const {title, author, url, likes} = request.body
  const id = request.params.id
  const foundBlog  = await Blog.findById(id)

  foundBlog.title = title || foundBlog.title
  foundBlog.author = author || foundBlog.author
  foundBlog.url = url || foundBlog.url
  foundBlog.likes = likes || foundBlog.likes

  const updatedBlog = await foundBlog.save()
  response.status(200).json(updatedBlog)

})
module.exports = blogsRouter