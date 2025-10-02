const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (_, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

personsRouter.get('/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      person ? response.json(person) : response.status(404).end()
    })
    .catch((e) => next(e))
})

personsRouter.post('/', (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ error: 'name is missing' })
  }

  if (!body.number) {
    return response.status(400).json({ error: 'number is missing' })
  }

  // if (data.some((p) => p.name.toLowerCase() === body.name.toLowerCase())) {
  //   return response.status(400).json({ error: 'name is already in the phonebook' })
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then((savedPerson) => response.json(savedPerson))
    .catch((e) => next(e))
})

personsRouter.put('/:id', (request, response, next) => {
  const { name, number } = request.body

  if (!number) {
    return response.status(400).json({ error: 'number is missing' })
  }

  Person.findById(request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save()
        .then((updatedPerson) => {
          response.json(updatedPerson)
        })
        .catch((e) => next(e))
    })
    .catch((e) => next(e))
})

personsRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch((e) => next(e))
})

module.exports = personsRouter
