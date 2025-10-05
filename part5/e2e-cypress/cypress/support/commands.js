Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', '/api/login', { username, password })
    .then(({ body }) => {
      localStorage.setItem('loggedInUser', JSON.stringify(body))
      cy.visit('')
    })
})

Cypress.Commands.add('addBlog', ({ title, author, url }) => {
  cy.request({
    url: '/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedInUser')).token}`
    }
  })
  cy.visit('')
})
