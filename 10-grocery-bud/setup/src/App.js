import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  return list ? JSON.parse(list) : []
}

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submit')
    if (!name) {
      // show alert
      showAlert(true, 'danger', 'please enter value')
    } else if (name && isEditing) {
      // edit 
      let newList = list.map(item => {
        if (item.id === editID) {
          return {...item, title: name}
        }
        return item
      })
      setName('')
      setIsEditing(false)
      setEditID(null)
      setList(newList)
      showAlert(true, 'success', 'Item edited')
    } else {
      // add item
      showAlert(true, 'success', 'Item added')
      let newItem = {
        id: new Date().getTime().toString(),
        title: name
      }
      setList([...list, newItem])
      setName('')
    }
  }

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, msg, type })
  }

  const clearList = () => {
    setList([])
    showAlert(true, 'danger', 'All list cleared')
  }

  const removeItem = (id) => {
    let newList = list.filter(item => item.id !== id)
    setList(newList)
    showAlert(true, 'danger', 'Item removed')
  }

  const editItem = (id) => {
    let targetItem = list.find(item => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(targetItem.title)
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])


  return <section className="section-center">
    <form className="grocery-form" onSubmit={handleSubmit}>
      <h3>grocery bud</h3>
      {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
      <div className="form-control">
        <input 
          type="text"
          className="grocery" 
          placeholder="e.g. eggs"
          value={name} 
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="submit-btn">
          {isEditing ? 'edit' : 'submit'}
        </button>
      </div>
    </form>

    {list.length > 0 && (
      <div className="grocery-container">
        <List items={list} removeItem={removeItem} editItem={editItem}/>
        <button className="clear-btn" onClick={clearList}>clear items</button>
      </div>
    )}
  </section>
}

export default App
