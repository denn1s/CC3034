import React, { useEffect, useState, useContext } from 'react'
import FirebaseContext from './hooks/FirebaseProvider'
import { query, collection, onSnapshot, addDoc } from 'firebase/firestore'

function App() {
  const { db } = useContext(FirebaseContext)
  const [newStudent, setNewStudent] = useState('')
  const [students, setStudents] = useState([]) 

  useEffect(() => {
    if (db) {
      onSnapshot(
        query(collection(db, 'students')),
        (querySnapshot) => {
          setStudents(querySnapshot.docs.map(d => ({ id: d.id, data: d.data() })))
        }
      )
    }
  }, [db])

  const handleAddStudent = async () => {
    await addDoc(
      collection(db, 'students'), {
        id: students.length,
        name: newStudent,
        present: false,
      }
    )
    setNewStudent('')
  }


  return (
    <div className="App">
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
              <div>
                  {students.map((student) => (
                    <div className="flex mb-4 items-center" key={student.id}>
                      <p className="w-full text-grey-darkest">{student.data.name}</p>
                      {
                        student.data.present ? (
                          <button className="shrink-0 p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-500 border-green-500 hover:bg-green-500">Present</button>
                        ) : (
                          <button className="shrink-0 p-2 ml-2 border-2 rounded text-red-500 border-red hover:text-white hover:bg-red-500">Not Present</button>
                        )
                      }
                    </div>
                  ))}
              </div>
              <div className="mb-4">
                  <h1 className="text-grey-darkest">Students</h1>
                  <div className="flex mt-4">
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-600" placeholder="Add Todo" value={newStudent} onChange={({ target: { value }}) => setNewStudent(value)} />
                      <button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal-500 hover:text-white hover:bg-teal-500">Add</button>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default App
