// Imports express router from express and Blog schema from mongoose
const blogsRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')

// GET route to find all blog posts
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})

  response.json(blogs)
})

// POST route to add a new blog post
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if(!body.title || !body.url) {
    return response.status(400).end()
  }

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  const savedBlog = await newBlog.save()
  response.status(201).json(savedBlog)
})

// DELETE route for removing a blog post
blogsRouter.delete('/:id', async(request, response) => {
  const id = request.params.id
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