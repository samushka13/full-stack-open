const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://db_user:${password}@cluster0.zyoo7wq.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3) {
  const person = new Person({
    name: String(process.argv[3]),
    number: process.argv[4] ? String(process.argv[4]) : undefined,
  })

  person.save().then((result) => {
    console.log(`${result.name ?? 'person'} saved!`)
    mongoose.connection.close()
  })
}

Person
  .find({})
  .then((result) => {
    console.log('phonebook:')
    result.forEach(person => console.log(person.name, person.number))
    mongoose.connection.close()
  })
