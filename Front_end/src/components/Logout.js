import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from './UserContext';

const Logout = () => {

    const { setUser } = useContext(UserContext);

    useEffect(() => {
        setUser(null);
        localStorage.clear();
    }, [setUser]);

    return(
        <>
           <Redirect to="/" />
        </>
    )
}

export default Logout;