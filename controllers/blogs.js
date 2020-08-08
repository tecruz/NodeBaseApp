const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if(!body.likes){
    body.likes = 0
  }

  const blog = new Blog(body)
  blog.user = user._id

  const blogSaved = await blog.save().then(t => t.populate('user' , { username: 1, name: 1 }).execPopulate())
  user.blogs = user.blogs.concat(blogSaved._id)
  await user.save()
  response.status(201).json(blogSaved)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const userId = decodedToken.id

  if (!token || !userId || !userId.toString() === blog.user.id.toString()) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  await blog.deleteOne()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const userId = decodedToken.id

  if (!token || !userId || !userId.toString() === blog.user.id.toString()) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const body = request.body

  const updateBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, updateBlog, { new: true, runValidators: true })
  response.json(updatedNote)
})

module.exports = blogsRouter