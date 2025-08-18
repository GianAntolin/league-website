import { NavLink } from 'react-router-dom'
import '../css/Error.css'
import { useEffect } from 'react'

interface ErrorPageProps{
  message: string,
  sendHome: boolean
}

/**
 * @param message - error Message
 * Error page that displays an error message and send home buttom if sendHome === true
 */
function ErrorPage({message, sendHome}:ErrorPageProps){
  useEffect( () => {
    document.title = 'Error'
  },[])
  return (
    <div className='error-content-top'>
      {message}
      {sendHome &&<div className='sub-error'>
        <NavLink to ='/'>
          Go back home
        </NavLink>
      </div>}
  </div>
)
  
}

export default ErrorPage
