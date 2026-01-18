const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blog posts return id and not _id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    if('_id' in blog || !('id' in blog )) {
      assert.fail('Object exposes _id or id not included')
    }
  });
})

test('add new blog to database', async () => {
  const newBlog = {
    title: "Testing blog 4",
    author: "unknown",
    url: "https://unknown",
    likes: 4
  }

  await api.post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const blogAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length + 1)

  const content = blogAtEnd.map(blog => blog.title)
  assert(content.includes(newBlog.title))

})

test('defaults likes to 0 if missing', async () => {
  const newBlog = {
    title: "Testing blog 4",
    author: "unknown",
    url: "https://unknown"
  }

  await api.post('/')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const blogsInDb = await helper.blogsInDb()
  const addedBlog = blogsInDb[blogsInDb.length - 1]
  assert.strictEqual(addedBlog.likes, 0)
})

test('Adding blog without title gives 400', async () => {
  const noTitleBlog = {
    author: "John Doe",
    url: "testingurl.com",
    likes: 400
  }

  await api.post('/').send(noTitleBlog).expect(400)
  const blogsInDb = await helper.blogsInDb()
  assert(blogsInDb.length, helper.initialBlogs.length)

})

test('Adding blog without url gives 400', async () => {
  const noUrlBlog = {
    title: "unknown blog",
    author: "John Doe",
    likes: 400
  }

  await api.post('/').send(noUrlBlog).expect(400)

  const blogsInDb = await helper.blogsInDb()
  assert(blogsInDb.length, helper.initialBlogs.length)

})

test('removes blog from database', async () => {
  const startingBlogsList = await helper.blogsInDb()
  const deletedBlog = startingBlogsList[0]

  await api.delete(`/api/blogs/${deletedBlog.id}`).expect(204)

  const endingBlogsList = await helper.blogsInDb()
  const ids = endingBlogsList.map(blog => blog.id)
  assert(!(ids.includes(deletedBlog.id)))
})

test('update blog information', async () => {
  const startingBlogsList = await helper.blogsInDb()
  let updatedBlog = startingBlogsList[0]
  console.log("First blog", updatedBlog)
  updatedBlog = {
    title: "First Blog",
    author: "Vincent",
    url: "testsite.com",
    likes: 2,
    id: updatedBlog.id
  }

  console.log("Updated blog", updatedBlog)

  await api.put(`/api/blogs/${updatedBlog.id}`).send(updatedBlog).expect(200)
  const blogsInDb = await helper.blogsInDb()
  const savedBlog = blogsInDb.find(blog => blog.id === updatedBlog.id)
  assert.deepStrictEqual(updatedBlog, savedBlog)
})


after(async () => {
  await mongoose.connection.close()
})