const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

describe('when blogs are initially saved', () => {

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

})

describe('viewing specific notes', () => {

  test('blog posts return id and not _id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      if('_id' in blog || !('id' in blog )) {
        assert.fail('Object exposes _id or id not included')
      }
    });
  })
})

describe('adding new note', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})
})


  test('add new blog to database', async () => {

    const newBlog = {
      title: "Testing blog",
      author: "Testing user",
      url: "https://unknown",
      likes: 4
    }

     await api.post('/api/users').send(helper.initialUser).expect(201).expect('Content-Type', /application\/json/)

    const response = await api.post('/api/login')
    .send({username: helper.initialUser.username, password: helper.initialUser.password})
    .expect(200)
    .expect('Content-Type', /application\/json/)

    await api.post('/api/blogs').send(newBlog).set('Authorization', `Bearer ${response.body.token}`).expect(201).expect('Content-Type', /application\/json/)

    const blogAtEnd = await helper.blogsInDb()
    assert(blogAtEnd.length === 1)

    const content = blogAtEnd.map(blog => blog.title)
    assert(content.includes(newBlog.title))

  })

  // TODO: Fix the rest of the tests in this section and add new test to fail if token is not given
  test.only('defaults likes to 0 if missing', async () => {
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

})


describe('deletion of a blog', () => {

  test('removes blog from database', async () => {
    const startingBlogsList = await helper.blogsInDb()
    const deletedBlog = startingBlogsList[0]

    await api.delete(`/api/blogs/${deletedBlog.id}`).expect(204)

    const endingBlogsList = await helper.blogsInDb()
    const ids = endingBlogsList.map(blog => blog.id)
    assert(!(ids.includes(deletedBlog.id)))
  })
})

describe('updating a blog', () => {

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
})

describe('when users are initially created', () => {

  beforeEach(async () => {
    await User.deleteMany({})
    await User.find({})

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()

  })

  test('creating a new user', async () => {
    const startingUserList = await helper.usersInDb()

    const newUser = {
      name: "Testing user",
      username: "test",
      password: "password"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const endingUserList = await helper.usersInDb()
    assert.strictEqual(startingUserList.length + 1, endingUserList.length)

    const usernames = endingUserList.map(user => user.username)
    assert(usernames.includes(newUser.username))
  })

  test('creating user without username', async () => {
    const noUsername = {
      name: 'Test',
      password: 'testingpassword'
    }

    const result = await api.post('/api/users').send(noUsername).expect(400)
    assert(result.body.error.includes('Username is required'))

  })

  test('creating user without password', async () => {
    const noPassword = {
    name: 'Test',
    username: 'test'
  }

    const result = await api.post('/api/users').send(noPassword).expect(400)
    assert(result.body.error.includes('Password is required'))

  })

  test('creating user invalid username length', async () => {
    const shortUsername = {
    name: 'Test',
    username: 'te',
    password: 'testingpassword'
  }

    const result = await api.post('/api/users').send(shortUsername).expect(400)
    assert(result.body.error.includes('Username must be at least 3 characters'))

  })

  test('creating user invalid password length', async () => {
    const shortPassword = {
    name: 'Test',
    username: 'test',
    password: 'te'
  }

    const result = await api.post('/api/users').send(shortPassword).expect(400)
    assert(result.body.error.includes('Password must be at least 3 characters'))

  })

   test('creating a user with a duplicate username', async () => {
    const duplicateUser = {
    name: 'Joe Doe',
    username: 'root',
    password: 'jodoe123'
  }

    const result = await api.post('/api/users').send(duplicateUser).expect(400)
    assert(result.body.error.includes('Username must be unique'))

  })
})

after(async () => {
  await mongoose.connection.close()
})