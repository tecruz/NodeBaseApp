describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'test',
      username: 'test',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('blog app')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()

      cy.contains('test logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('test')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('[role="alert"]')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(97, 26, 21)')

      cy.get('html').should('not.contain', 'test logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'test', password: 'test' })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#fTitle').type('a blog created by cypress')
      cy.get('#fAuthor').type('author')
      cy.get('#fUrl').type('https://fullstackopen.com/en/part5/end_to_end_testing')
      cy.contains('create').click()
      cy.contains('a blog created by cypress')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Another blog by cypress',
          author: 'Cypress',
          url: 'https://fullstackopen.com/en/part5/end_to_end_testing#controlling-the-state-of-the-database'
        })
      })

      it('it can be liked', function () {
        cy.contains('Another blog by cypress').click()
        cy.contains('likes 0')
        cy.get('#likeBtn').click()
        cy.contains('likes 1')
      })
    })
  })
})