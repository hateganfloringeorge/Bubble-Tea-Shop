import React, {useState, useContext} from 'react';
import {Link, Redirect} from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import { UserContext } from './UserContext';
import axios from 'axios';

const Review = () => {

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [reviewError, setReviewError] = useState("");
    const [isSent, setIsSent] = useState(false);
    const { user } = useContext(UserContext);
    const token = localStorage.getItem("token");

    const handleStars = (nextValue, prevValue, name) => {
        setRating(nextValue);
    }

    const handleChange = ({ target: { type, name, value, checked } }, setterFunction) => {
        setterFunction( type === 'checkbox' ? checked : value );
    }

    const validate = () => {
        let reviewError = "";

        if (!review)
            reviewError = "Review cannot be blank";

        if (!user)
            reviewError = "Please login to be able to send review!";

        if (reviewError) {
            setReviewError(reviewError);
            return false;
        }

        return true;
    }

    function handleAddingSuccess() {
        alert('Added review successfully!');
    }

    function handleFail(error) {
        alert('Something bad happened!Please try again later!');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();     
        if (isValid && token && user) {
            var data = {
                message: review,
                userPosting: user._id,
                rating
            }
            axios.post('http://localhost:3000/api/v1/reviews/',
                data, 
                {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => handleAddingSuccess(response.data))
            .catch((error) => handleFail(error));

            setIsSent(true);
        }
    }


    return(
        <>
        {isSent ? <Redirect to="/" /> :
         <div className="pageTitle">
                    <h1>Contact</h1>
        </div>
        }
        <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div style={{color: "red"}}>
                        {reviewError}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Review</label>
                    <textarea 
                        id="review"
                        type="text-area"
                        name="review"
                        placeholder="Write about your experiences here"
                        value={review} 
                        onChange={ event => handleChange(event, setReview)} 
                    />
                </div>
                <h2>Rating of our services: {rating}</h2>
                <StarRatingComponent 
                    name="rate" 
                    starCount={10}
                    value={rating}
                    onStarClick={handleStars}
                />
                
                <div className="form-group">
                    <button type="Submit" className="btn btn-primary">Send Review</button>
                </div>
            </form>
            <div className="form-group">
                <h3>Need some answers?Write us below!</h3>
            </div>
            <div className="form-group">
                <Link to="/contact" className="btn btn-primary">Contact us</Link>
                <Link to="/faq" className="btn btn-primary">FAQ</Link>
            </div>
        </div>
        </>
    )
}

export default Review;