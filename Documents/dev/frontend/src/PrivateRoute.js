import React from 'react';
import {Redirect} from 'react-router-dom';
import LayoutRoute from './LayoutRoute';

const PrivateRoute = (props) => {

    if(localStorage.getItem('jwt')) {
    return(
        <LayoutRoute 
        path = {props.path}
        exact = {props.exact}
        component = {props.component}/>
       
    )
    }

    else{
    
    return(
        <Redirect to='/login' />
    )

    }
}

export default PrivateRoute;