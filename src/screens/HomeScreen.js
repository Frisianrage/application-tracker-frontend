import React, {useContext} from 'react'
import { AuthContext } from '../context/auth'

function HomeScreen() {

  const {user} = useContext(AuthContext)

  if(user){
    console.log(user)
  }

  return (
    <>
      {user ? (<h1> Hello { user.firstname ? user.firstname : 'User' }</h1>) : (<h1>Hello Stranger!!</h1>)} 
    </>
    
        
  );
}

export default HomeScreen