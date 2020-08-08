const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

const globals = {}

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', name: 'root', passwordHash })

  const userSaved = await user.save()

  const userForToken = {
    username: userSaved.username,
    id: userSaved._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)
  globals.token = `Bearer ${token}`
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)
    expect(contents).toContain(
      'Go To Statement Considered Harmful'
    )
  })
})

describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const blogNote = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(blogNote.body).toEqual(blogToView)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    console.log(validNonexistingId)

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'Me',
      url: 'http://localhost/index.html',
      likes: 9999
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', globals.token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.user.name).toBe('root')
    expect(response.body.user.username).toBe('root')

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
      'New Blog'
    )
  })

  test('fails with status code 400 if data invalid', async () => {
    const newBlog = {
      title: 'Title'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', globals.token)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('if likes property is missing defaults to 0', async () => {
    const newBlog = {
      title: 'Title',
      author: 'Author',
      url: 'url'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', globals.token)
      .send(newBlog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const likes = blogsAtEnd.map(r => r.likes)
    expect(likes).toContain(0)
  })

  test('error with no token', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'New Author',
      url: 'http://localhost',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)


    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).not.toContain(
      'New Author'
    )
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'Me',
      url: 'http://localhost/index.html',
      likes: 9999
    }

    await api
      .post('/api/blogs')
      .set('Authorization', globals.token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const token = globals.token.substring(7)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart.find(blog => {
      if(blog.user) {
        return blog.user.id.toString() === decodedToken.id.toString()
      }
    })

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', globals.token)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('update blog', () => {
  test('succeeds with status code 200 if data is valid', async () => {
    const newBlog = {
      title: 'Update Blog',
      author: 'Me',
      url: 'http://localhost/index.html',
      likes: 9999
    }

    await api
      .post('/api/blogs')
      .set('Authorization', globals.token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const token = globals.token.substring(7)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart.find(blog => {
      if(blog.user) {
        return blog.user.id.toString() === decodedToken.id.toString()
      }
    })

    blogToUpdate.likes = 99

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', globals.token)
      .send(blogToUpdate)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)

    const likes = blogsAtEnd.map(r => r.likes)

    expect(likes).toContain(blogToUpdate.likes)
  })

  test('fails with status code 400 if data invalid', async () => {
    const newBlog = {
      title: 'Update Blog Fail',
      author: 'Me',
      url: 'http://localhost/index.html',
      likes: 9999
    }

    await api
      .post('/api/blogs')
      .set('Authorization', globals.token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const token = globals.token.substring(7)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart.find(blog => {
      if(blog.user) {
        return blog.user.id.toString() === decodedToken.id.toString()
      }
    })

    delete blogToUpdate.title
    delete blogToUpdate.url

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', globals.token)
      .send(blogToUpdate)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})