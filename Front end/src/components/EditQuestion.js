import React, { useContext, useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import axios from "axios";


const EditQuestion = (props) => {

    const [answer, setAnswer] = useState("");
    const [answerError, setAnswerError] = useState("");
    const { user, setUser } = useContext(UserContext);
    const [question, setQuestion] = useState("");
    const token = localStorage.getItem("token");
    

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/questions/${props.match.params.id}`, 
        {headers: {Authorization: `Bearer ${token}`}})
        .then(response =>
          {
            const question = response.data;
            console.log(question);
            setQuestion(question);
          })
        .catch(error => console.error(error));
      }, []);

    const validate = () => {
        let answerError = "";

        if (!answer)
            answerError = "Invalid answer";

        if (answerError) {
            setAnswerError(answerError);
            return false;
        }

        return true;
    }

    const handleChange = ({ target: { type, name, value, checked } }, setterFunction) => {
        setterFunction( type === 'checkbox' ? checked : value );
    }

    function handleSuccess({token, user}) {
        alert('Answer saved!');
    }

    function handleSuccess(error) {
        console.log(error);
        alert(error);
    }

    const handleSubmit = (event) => {
        event.preventDefault();     
        const isValid = validate();
        if (isValid && token) {
            var payload = {
                reply: answer,
            }
            axios.put(`http://localhost:3000/api/v1/questions/${props.match.params.id}`, payload, 
            {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => handleSuccess(response.data))
            .catch((error) => handleSuccess(error))
        }
    }

    return(
        <>
        {!user || user.role === "user" ? <Redirect to="/" /> :
            <div className="pageTitle">
                <h1>Answer</h1>
            </div>
        }
            <div className="form-wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div style={{color: "red"}}>
                            {answerError}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>{question.comment}</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="answer" >Answer</label>
                        <input 
                            id="answer"
                            name="answer"
                            placeholder="Write answer here"
                            value={answer} 
                            onChange={event => handleChange(event, setAnswer)}
                        />
                    </div>
                    <div className="form-group">
                        <button type="Submit" className="btn btn-primary">Send Email</button>
                    </div>
                </form>
            </div>
        </>
    );

}

export default EditQuestion;