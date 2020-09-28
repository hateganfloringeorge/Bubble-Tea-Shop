import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Card from 'react-bootstrap/Card'
import { UserContext } from './UserContext';


const FAQ = () => {

  const [questions, setQuestions] = useState([]);
  const { user } = useContext(UserContext);
  const token = localStorage.getItem("token");
  const [trigger, setTrigger] = useState(1);

  useEffect(() => {

    axios.get("http://localhost:3000/api/v1/questions")
    .then(response =>
      {
        const questionList = response.data;
        console.log(questionList);
        setQuestions(questionList);
      })
    .catch(error => console.error(error));
  }, [trigger]);

  function deleteQuestion (event) {
    const id = event.target.value;
    if (id && token){
        axios.delete(`http://localhost:3000/api/v1/questions/${id}`,
            {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => alert('Question has been deleted!'))
            .catch((error) => alert(error));
        setTrigger(trigger + 1);
    }
  }

  function showQuestion(event) {
    const id = event.target.value;
    if (id && token){
        axios.get(`http://localhost:3000/api/v1/questions/change/${id}`,
            {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error));
            setTrigger(trigger + 1);
    }

  }

  function editAnswer(event) {

  }

    return(
        <>
            <div className="pageTitle">
                <h1>FAQ</h1>
            </div>
            {user && user.role !== "user" ? questions.map(
                myQuestion => 
                <div className="form-group" key={myQuestion._id}>
                    <Card>
                        <Card.Header>Q: {myQuestion.comment}</Card.Header>
                            <Card.Text>
                                {myQuestion.reply ? "A: " + myQuestion.reply : "A: Will be answered soon"}
                                
                                    {user.role === "admin" ?
                                        <button type="Submit" className="btn btn-primary" value={myQuestion._id} onClick={deleteQuestion}>Delete question</button>
                                    : <></>}
                                    <button 
                                        type="Submit" 
                                        className="btn btn-primary"
                                        value ={myQuestion._id}
                                        onClick={showQuestion}
                                    >
                                        {myQuestion.faq ? "Don't show" : "Show"}
                                    </button>
                                    <a href={`/#/faq/${myQuestion._id}`} class="active">Answer</a>
                            </Card.Text>
                        <Card.Footer className="text-muted">By user: {myQuestion.userPosting.username}</Card.Footer>
                    </Card>
                </div>
            ) : questions.filter((myQuestion) => myQuestion.faq).map(
                myQuestion => 
                <div className="form-group" key={myQuestion._id}>
                    <Card>
                        <Card.Header>Q: {myQuestion.comment}</Card.Header>
                            <Card.Text>
                                {myQuestion.reply ? "A: " + myQuestion.reply : "A: Will be answered soon"}
                            </Card.Text>
                        <Card.Footer className="text-muted">By user: {myQuestion.userPosting.username}</Card.Footer>
                    </Card>
                </div>
            )}
        </>
    )
}

export default FAQ;