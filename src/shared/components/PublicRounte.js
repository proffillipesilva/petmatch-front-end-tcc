import React from 'react'
import {useAuth} from '../context/AuthContext'
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/auth-store';

const PublicRoute = ({children}) => {
  //const {isAuthenticated } = useAuth();
  const {user} = useAuthStore();
  return (
   
     
    user == null ? children : <Navigate to={"/home"} replace />
    
  )
}

export default PublicRoute



TEM Q FAZER AINDA