const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  if(!blogs) {
    return null
  }

  if(blogs.length === 0) {
    return 0
  }

  if(blogs.length === 1) {
    return blogs[0].likes
  }

  const total = blogs.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.likes
    }, 0)
  return total
}

const favoriteBlog = (blogs) => {
  if(!blogs || blogs.length === 0) {
    return null
  }

  if(blogs.length === 1) {
    return blogs[0]
  }

  const favoriteBlog = blogs.reduce((prev, current) => {
    return prev.likes > current.likes ? prev : current
  })
  return favoriteBlog
}

const mostBlog = (blogs) => {
  if(!blogs || blogs.length === 0) {
    return null
  }

  if(blogs.length === 1) {
    return {
      author: blogs[0].author,
      blogs: 1
    }
  }

  const blogCounts = lodash.countBy(blogs, 'author')

  const topAuthor = lodash.maxBy(Object.keys(blogCounts), author => blogCounts[author])

  return {
    author: topAuthor,
    blogs: blogCounts[topAuthor],
  }
}

const mostLikes = (blogs) => {
  if(!blogs || blogs.length === 0) {
    return null
  }

  if(blogs.length === 1) {
    return {
      author: blogs[0].author,
      likes: blogs[0].likes
    }
  }

  const mostLikedBlog = lodash.maxBy(blogs, 'likes')

  return {
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog,
  mostLikes
}