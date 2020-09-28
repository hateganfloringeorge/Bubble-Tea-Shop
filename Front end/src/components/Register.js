import React, { useContext, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import axios from "axios";


const Register = () => {

    const [registerDone, setRegisterDone] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [gdpr, setGdpr] = useState(false);
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [gdprError, setGdprError] = useState("");
    const { user } = useContext(UserContext);
    
    

    const validate = () => {
        let usernameError = "";
        let passwordError = "";
        let emailError = "";
        let gdprError = "";

        if (username.length <= 3)
            usernameError = "Username needs to be more than 3 characters";

        if (password.length <= 3)
            passwordError = "Password needs to be more than 3 characters";

        if (!gdpr)
            gdprError = "Please accept our terms and conditions!";

        
        if (usernameError || passwordError || emailError || gdprError) {
            setUsernameError(usernameError);
            setPasswordError(passwordError);
            setEmailError(emailError);
            setGdprError(gdprError);
            return false;
        }

        return true;
    }

    const handleChange = ({ target: { type, name, value, checked } }, setterFunction) => {
        setterFunction( type === 'checkbox' ? checked : value );
    }

    function handleRegisterSuccess() {
        alert("An email was sent to your email address.Please confirm before logging in!");
    }

    function handleRegisterFail(error) {
        console.log(error);
        alert(error);
    }

    const handleSubmit = (event) => {
        event.preventDefault();     
        const isValid = validate();
        if (isValid) {
            var payload = {
                username,
                password,
                email,
            }
            axios.post('http://localhost:3000/api/v1/users/register', payload)
            .then((response) => handleRegisterSuccess())
            .catch((error) => handleRegisterFail(error))
            setRegisterDone(true);
        }
    }

    return(
        <>
        {!user && registerDone ? <Redirect to="/" /> :
            <div className="pageTitle">
                <h1>Register</h1>
            </div>
        }   
            <div className="form-wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div style={{color: "red"}}>
                            {usernameError}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username" >Username</label>
                        <input 
                            id="username"
                            name="username"
                            placeholder="username/email"
                            value={username} 
                            onChange={event => handleChange(event, setUsername)}
                        />
                    </div>
                    
                    <div className="form-group">
                        <div style={{color: "red"}}>
                            {passwordError}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            id="password"
                            type="password"
                            name="password"
                            placeholder="password"
                            value={password} 
                            onChange={ event => handleChange(event, setPassword)} 
                        />
                    </div>

                    <div className="form-group">
                        <div style={{color: "red"}}>
                            {emailError}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            id="email"
                            type="email"
                            name="email"
                            placeholder="email"
                            value={email} 
                            onChange={ event => handleChange(event, setEmail)} 
                        />
                    </div>
                    
                    <div className="form-group">
                        <div style={{color: "red"}}>
                            {gdprError}
                        </div>
                    </div>
                    
                        <input 
                            id="gdpr"
                            type="checkbox" 
                            name="gdpr"
                            onChange={event => handleChange(event, setGdpr)}
                            checked={gdpr} 
                        > 
                        </input>
                        <label htmlFor="gdpr"> I agree with GDPR - <span><Link to="/gdpr">Terms and conditions!</Link></span></label>
                    

                    <div className="form-group">
                        <button type="Submit" className="btn btn-primary">Register</button>
                    </div>
                </form>
                <div className="form-group">
                    <h3>Already have account, login below!</h3>
                </div>
                <div className="form-group">
                    <Link to="/login" className="btn btn-primary">Login</Link>
                </div>
            </div>
        </>
    );

}

export default Register;