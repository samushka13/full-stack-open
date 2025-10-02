const mainRouter = require('express').Router()
const Person = require('../models/person')

mainRouter.get('/', (_, response) => {
  response.send('<h1>Welcome to the phonebook!</h1>')
})

mainRouter.get('/info', (_, response) => {
  Person.find({}).then((persons) => {
    response.send(`
      <div>
        <p>The phonebook includes ${persons.length} people</p>
        <p>${new Date()}</p>
      </div>
    `)
  })
})

module.exports = mainRouter
