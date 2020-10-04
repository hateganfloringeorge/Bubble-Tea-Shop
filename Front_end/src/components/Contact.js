import React, {useState, useContext} from 'react';
import {Redirect, Link} from 'react-router-dom';
import { UserContext } from './UserContext';
import axios from 'axios';

const Contact = () => {

    const [question, setQuestion] = useState("");
    const [questionError, setQuestionError] = useState("");
    const [sent, setIsSent] = useState("");
    const { user } = useContext(UserContext);
    const token = localStorage.getItem("token");

    const handleChange = ({ target: { type, name, value, checked } }, setterFunction) => {
        setterFunction( type === 'checkbox' ? checked : value );
    }

    const validate = () => {
        let questionError = "";

        if (!question)
            questionError = "Question text cannot be blank";

        if (!user)
            questionError = "Please login to be able to send question!";
    
        if (questionError) {
            setQuestionError(questionError);
            return false;
        }

        return true;
    }

    function handleAddingSuccess() {
        alert('Added question successfully!');
    }

    function handleFail(error) {
        alert('Something bad happened!Please try again later!');
    }

    const handleSubmit = (event) => {
        event.preventDefault();     
        const isValid = validate();
        if (isValid && token && user) {
            var data = {
                comment: question,
                userPosting: user._id,
            }
            axios.post('http://localhost:3000/api/v1/questions/',
                data, 
                {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => handleAddingSuccess(response.data))
            .catch((error) => handleFail(error));

            setIsSent(true);
        }
    }


    return(
        <>

        {sent ? <Redirect to="/" /> :
            <div className="pageTitle">
                    <h1>Contact</h1>
            </div>
        }
        <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div style={{color: "red"}}>
                        {questionError}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="question">Your Message</label>
                    <textarea 
                        id="question"
                        type="text-area"
                        name="question"
                        placeholder="Any concerns or questions you may have"
                        value={question}
                        onChange={ event => handleChange(event, setQuestion)} 
                    />
                </div>
                <div className="form-group">
                    <button type="Submit" className="btn btn-primary">Send Question</button>
                </div>  
            </form>
            <div className="form-group">
                <h3>See our FAQ or review us below!</h3>
            </div>
            <div className="form-group">
                <Link to="/review" className="btn btn-primary">Review us</Link>
                <Link to="/faq" className="btn btn-primary">FAQ</Link>
            </div>
        </div>
        </>
    )
}

export default Contact;