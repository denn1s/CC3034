import React, { useEffect, useState, useContext, createContext } from 'react'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAtKUhl1lMYhSgCFDwcZVmg_W3K7sJUTsA",
  authDomain: "uvg-2022-firebase.firebaseapp.com",
  projectId: "uvg-2022-firebase",
  storageBucket: "uvg-2022-firebase.appspot.com",
  messagingSenderId: "152588927740",
  appId: "1:152588927740:web:66b0152a35236ce422cd79"
}

const FirebaseContext = createContext()

const FirebaseProvider = ({ children }) => {
    const [app, setApp] = useState(null)
    const [db, setDb] = useState(null)

    useEffect(() => {
        setApp(initializeApp(firebaseConfig))
    }, [])
    
    useEffect(() => {
      if (app) {
        setDb(getFirestore(app))
      }
    }, [app])

    return (
        <FirebaseContext.Provider value={{ app, db }}>
           {children}
        </FirebaseContext.Provider>
    )
}

export { FirebaseProvider }
export default FirebaseContext