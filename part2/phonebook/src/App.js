import { useState } from 'react'



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [searching, setSearching] = useState(false);

  const HandleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const HandleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleSearchChange = (event) => {
    event.preventDefault();
    const term = event.target.value;
    if (term.trim().length > 0) {
      setSearching(true);
    } else {
      setSearching(false);
    }
    setNewSearch(term);
  }

  const addPerson = (event) => {
    event.preventDefault()
  
    const person = persons.find(
      person => person.name.toLowerCase() === newName.toLowerCase()
    )
  
    let error = false
  
    if (person) {
      alert(`${newName}'s name is already in the list`);
      setNewName("");
      error = true;
    }
    if(!error){
      setPersons(persons.concat({name:newName, number:newNumber}))
      setNewName("")
      setNewNumber("")
    }
  }
  
  const getContent = () => {
    let currentPersons = null;
    if (searching) {
      currentPersons = persons.filter(person => {
        return (
          person.name.toLowerCase().includes(newSearch.toLowerCase())
        )
      })
    } else {
      currentPersons = [...persons];
    }
  
    return currentPersons.map(person => (
      <li key={person.name}>
        {person.name}
        {": "}
        {person.number}
      </li>
    ))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        search: <input value={newSearch} onChange={handleSearchChange} id="search"></input>
      </div>
      <h2>add a new</h2>
      <form onSubmit = {addPerson}>
        <div>
          name: <input value = {newName} onChange={HandleNameChange} id="name"/>
        </div>
        <div>
          number: <input value = {newNumber} onChange={HandleNumberChange} id="number" />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
       <ul>{getContent()}</ul>
    </div>
  )
}

export default App