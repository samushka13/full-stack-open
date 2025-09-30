const express = require('express')
const morgan = require('morgan')
const app = express()

morgan.token('body', request => JSON.stringify(request.body))

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let data = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": "1"
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": "2"
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": "3"
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": "4"
  }
]

app.get('/', (_, response) => {
  response.send('<h1>Welcome to the phonebook!</h1>')
})

app.get('/info', (_, response) => {
  response.send(`
    <div>
      <p>The phonebook includes ${data.length} people</p>
      <p>${new Date()}</p>
    </div>
  `)
})

app.get('/api/persons', (_, response) => {
  response.json(data)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = data.find(p => p.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

const generateId = () => {
  const min = 0
  const max = 1000000
  const randId = Math.floor(Math.random() * (max - min + 1) + min)

  return String(randId)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name is missing' 
    })
  }

  if (!body.number) {
    return response.status(400).json({ 
      error: 'number is missing' 
    })
  }

  if (data.some((p) => p.name.toLowerCase() === body.name.toLowerCase())) {
    return response.status(400).json({ 
      error: 'name is already in the phonebook' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  data = data.concat(person)

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  data = data.filter(p => p.id !== id)

  response.status(204).end()
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
