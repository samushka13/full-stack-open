import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ value, onChange }) => {
  return (
    <div>
      Filter with: <input onChange={onChange} value={value} />
    </div>
  )
}

const Form = ({ match, name, number, onNameChange, onNumberChange, onAdd }) => {
  return (
    <form>
      <div>
        Name: <input onChange={onNameChange} value={name} />
      </div>
      <div>
        Number: <input onChange={onNumberChange} value={number} />
      </div>
      <div>
        <button type="submit" onClick={onAdd}>{match ? "Update" : "Add"}</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, onDelete }) => {
  const onClick = (p) => window.confirm(`Delete ${p.name}`) && onDelete(p)
  
  return (
    <div>
      {persons.map((p) => (
        <div key={p.name}>
          <p>{p.name} {p.number}</p>
          <button onClick={() => onClick(p)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

const Notification = ({ message }) => {
  const style = {
    color: message.isError ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={style}>
      {message.text}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  const [message, setMessage] = useState({ text: '', isError: false })

  const personsToShow = filterString
    ? persons.filter((p) => p.name.toLowerCase().includes(filterString))
    : persons

  const match = persons.find((p) => p.name === newName);

  const resetInputs = () => {
    setNewName('')
    setNewNumber('')
  }

  const onAddPerson = (event) => {
    event.preventDefault()

    const newPerson = { name: newName, number: newNumber }

    if (match) {
      const message = `${newName} is already in the phonebook.\nUpdate number to ${newNumber}?`
      const isConfirmed = window.confirm(message)

      if (isConfirmed) {
        personService
          .update(match.id, newPerson)
          .then((res) => {
            setPersons((prev) => prev.map((p) => p.id === res.id ? res : p))
            setMessage({ text: `Updated ${newName} (${newNumber})!`, isError: false })
            resetInputs()
          })
          .catch((e) => {
            console.error(e)
            setMessage({ text: `${newName} does not exist on the server!`, isError: true })
          }
        )
      }
    } else {
      personService
        .create(newPerson)
        .then((res) => {
          setPersons((prev) => prev.concat(res))
          setMessage({ text: `Added ${newName} (${newNumber})!`, isError: false })
          resetInputs()
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterString(event.target.value)
  }

  const handleFetch = () => {
    personService
      .getAll()
      .then(setPersons)
  }

  const handleDelete = (person) => {
    personService
      .remove(person.id)
      .then(() => {
        setPersons((prev) => prev.filter((p) => p.id !== person.id))
        setMessage({ text: `Deleted ${person.name}!`, isError: false })
      })
      .catch((e) => {
        console.error(e)
        setMessage({ text: `${person.name} does not exist on the server!`, isError: true })
      })
  }

  const handleMessage = () => {
    message.text && setTimeout(() => setMessage({ text: '', isError: false }), 3000)
  }

  useEffect(handleFetch, [])

  useEffect(handleMessage, [message])

  return (
    <div>
      <h2>Phonebook</h2>

      {message.text && <Notification message={message} />}

      <Filter onChange={handleFilterChange} value={filterString} />

      <h3>Add Person</h3>

      <Form
        match={match}
        name={newName}
        number={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onAdd={onAddPerson}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} onDelete={handleDelete} /> 
    </div>
  )

}

export default App
