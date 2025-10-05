const TEST_USER = {
  username: 'playwright-test-username',
  password: 'playwrighttestpassword',
  name: 'Playwright Test User'
}

const TEST_USER_2 = {
  username: 'playwright-test-username-2',
  password: 'playwrighttestpassword2',
  name: 'Playwright Test User 2'
}

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', '/api/testing/reset')
    cy.request('POST', '/api/users/', TEST_USER) 
    cy.request('POST', '/api/users/', TEST_USER_2) 
    cy.visit('')
  })

  it('front page can be opened', function() {
    cy.contains('Welcome')
  })

  it('user can login', function () {
    cy.contains('button', 'Login').click()
    cy.contains('label', 'Username:').type(TEST_USER.username)
    cy.contains('label', 'Password:').type(TEST_USER.password)
    cy.contains('button', 'Login').click()
    cy.contains(TEST_USER.name)
  })

  it('login fails with wrong password', function() {
    cy.contains('button', 'Login').click()
    cy.contains('label', 'Username:').type(TEST_USER.username)
    cy.contains('label', 'Password:').type('wrongpassword')
    cy.contains('button', 'Login').click()
    cy.contains(TEST_USER.name).should('not.exist')
  })

  it('login fails with wrong username', function() {
    cy.contains('button', 'Login').click()
    cy.contains('label', 'Username:').type('wrong-username')
    cy.contains('label', 'Password:').type(TEST_USER.password)
    cy.contains('button', 'Login').click()
    cy.contains(TEST_USER.name).should('not.exist')
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: TEST_USER.username, password: TEST_USER.password })
    })

    it('a blog can be created', function() {
      cy.contains('Add blog').click()
      cy.contains('label', 'Title:').type('test title')
      cy.contains('label', 'Author:').type('test author')
      cy.contains('label', 'Url:').type('test url')
      cy.contains('Save').click()
      cy.contains('test title by test author')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.addBlog({ title: 'test title', author: 'test author', url: 'test url' })
      })

      it('it can be liked', function () {
        cy.contains('View').click()
        cy.contains('Like').click()
        cy.contains('Likes: 1')
      })

      it('it can be deleted by their adder', function () {
        cy.contains('View').click()
        cy.contains('Delete').click()
        cy.on('window:confirm', () => true);
        cy.contains('test title by test author').should('not.exist')
      })

      it('it can not be deleted by another user', function () {
        cy.contains('Logout').click()
        cy.login({ username: TEST_USER_2.username, password: TEST_USER_2.password })
        cy.contains('View').click()
        cy.contains('Delete').should('not.exist')
      })

      it('blogs are sorted based on likes in descending order', function () {
        cy.addBlog({ title: 'test title 2', author: 'test author', url: 'test url 2' })
        cy.addBlog({ title: 'test title 3', author: 'test author', url: 'test url 3' })
        cy.wait(500)

        cy.get('button:contains("View")').then((buttons) => cy.wrap(buttons[1]).click())
        cy.contains('Like').click()
        cy.wait(500)
        cy.contains('Like').click()
        cy.wait(500)
        cy.contains('Hide').click()

        cy.get('button:contains("View")').then((buttons) => cy.wrap(buttons[2]).click())
        cy.contains('Like').click()
        cy.wait(500)
        cy.contains('Hide').click()

        cy.get('div:contains("by test author")').then((blogs) => {
          cy.wrap(blogs[0]).contains('test title 2 by test author')
          cy.wrap(blogs[1]).contains('test title 3 by test author')
          cy.wrap(blogs[2]).contains('test title by test author')
        })
      })
    })

    it('logout succeeds', function () {
      cy.contains('Logout').click()
      cy.contains(TEST_USER.name).should('not.exist')
    })
  })
})
