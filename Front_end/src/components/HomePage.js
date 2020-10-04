import React, { useEffect, useState, useContext } from 'react';
import axios from "axios";
import Card from 'react-bootstrap/Card';
import StarRatingComponent from 'react-star-rating-component';
import { UserContext } from './UserContext';

const HomePage = () => {

    const [reviews, setReviews] = useState([]);
    const { user } = useContext(UserContext);
    const token = localStorage.getItem("token");
    const [trigger, setTrigger] = useState(1);
  
    useEffect(() => {
  
      axios.get("http://localhost:3000/api/v1/reviews")
      .then(response =>
        {
          const reviewList = response.data;
          setReviews(reviewList);
        })
      .catch(error => alert(error));
    }, [trigger]);

    function handleDeleteSuccess ()
    {
        alert('Deleted Review');
    }

    function handleDeleteFail (error) {
        alert(error);
    }

    function deleteReview(event) {
        const id = event.target.value;
        if (id && token) {
            axios.delete(`http://localhost:3000/api/v1/reviews/${id}`,
                {headers: {Authorization: `Bearer ${token}`}})
                .then((response) => handleDeleteSuccess(response.data))
                .catch((error) => handleDeleteFail(error));
                setTrigger(trigger + 1);
        }
    }

    function showReview(event) {
        const id = event.target.value;
        if (id && token){
            axios.get(`http://localhost:3000/api/v1/reviews/change/${id}`,
                {headers: {Authorization: `Bearer ${token}`}})
                .then((response) => console.log(response.data))
                .catch((error) => console.log(error));
                setTrigger(trigger + 1);
        }
    }

    return(
        <>
            <section id="showcase">
                <div class="container">
                <h1>
                    Random title
                </h1>
                <p>
                    Ye on properly handsome returned throwing am no whatever. In without wishing he of picture no exposed talking minutes. Curiosity continual belonging offending so explained it exquisite. Do remember to followed yourself material mr recurred carriage. High drew west we no or at john. About or given on witty event. Or sociable up material bachelor bringing landlord confined. Busy so many in hung easy find well up. So of exquisite my an explained remainder. Dashwood denoting securing be on perceive my laughing so. 

                    Same an quit most an. Admitting an mr disposing sportsmen. Tried on cause no spoil arise plate. Longer ladies valley get esteem use led six. Middletons resolution advantages expression themselves partiality so me at. West none hope if sing oh sent tell is. 

                    Piqued favour stairs it enable exeter as seeing. Remainder met improving but engrossed sincerity age. Better but length gay denied abroad are. Attachment astonished to on appearance imprudence so collecting in excellence. Tiled way blind lived whose new. The for fully had she there leave merit enjoy forth. 

                    Attended no do thoughts me on dissuade scarcely. Own are pretty spring suffer old denote his. By proposal speedily mr striking am. But attention sex questions applauded how happiness. To travelling occasional at oh sympathize prosperous. His merit end means widow songs linen known. Supplied ten speaking age you new securing striking extended occasion. Sang put paid away joy into six her. 

                    Was justice improve age article between. No projection as up preference reasonably delightful celebrated. Preserved and abilities assurance tolerably breakfast use saw. And painted letters forming far village elderly compact. Her rest west each spot his and you knew. Estate gay wooded depart six far her. Of we be have it lose gate bred. Do separate removing or expenses in. Had covered but evident chapter matters anxious. 

                    Started several mistake joy say painful removed reached end. State burst think end are its. Arrived off she elderly beloved him affixed noisier yet. An course regard to up he hardly. View four has said does men saw find dear shy. Talent men wicket add garden. 

                    Sudden looked elinor off gay estate nor silent. Son read such next see the rest two. Was use extent old entire sussex. Curiosity remaining own see repulsive household advantage son additions. Supposing exquisite daughters eagerness why repulsive for. Praise turned it lovers be warmly by. Little do it eldest former be if. 

                    To they four in love. Settling you has separate supplied bed. Concluded resembled suspected his resources curiosity joy. Led all cottage met enabled attempt through talking delight. Dare he feet my tell busy. Considered imprudence of he friendship boisterous. 

                    His followed carriage proposal entrance directly had elegance. Greater for cottage gay parties natural. Remaining he furniture on he discourse suspected perpetual. Power dried her taken place day ought the. Four and our ham west miss. Education shameless who middleton agreement how. We in found world chief is at means weeks smile. 

                    In post mean shot ye. There out her child sir his lived. Design at uneasy me season of branch on praise esteem. Abilities discourse believing consisted remaining to no. Mistaken no me denoting dashwood as screened. Whence or esteem easily he on. Dissuade husbands at of no if disposal. 
                </p>
                </div>
            </section>
            <div className="pageTitle">
                    <h1>Our reviews</h1>
            </div>
            {!user || (user && user.role === "user") ? reviews.filter((myReview) => myReview.showOnSite).map(
                    myReview => 
                    <div className="form-group">
                        <Card>
                            <Card.Header>{myReview.message}</Card.Header>
                                <Card.Text>
                                <StarRatingComponent 
                                    name="rate" 
                                    starCount={10}
                                    value={myReview.rating}
                                />
                                </Card.Text>
                            <Card.Footer className="text-muted">By user: {myReview.userPosting.username}</Card.Footer>
                        </Card>
                    </div>
            ):  reviews.map(
                myReview => 
                <div className="form-group">
                    <Card>
                        <Card.Header>{myReview.message}</Card.Header>
                            <Card.Text>
                            <StarRatingComponent 
                                name="rate" 
                                starCount={10}
                                value={myReview.rating}
                            />
                            {user.role === "admin" ?
                                    <button type="Submit" className="btn btn-primary" value={myReview._id} onClick={deleteReview}>
                                        Delete review
                                    </button>
                                    : <></>}
                                    <button 
                                        type="Submit" 
                                        className="btn btn-primary"
                                        value ={myReview._id}
                                        onClick={showReview}
                                    >
                                        {myReview.showOnSite ? "Don't show" : "Show"}
                                    </button>
                            </Card.Text>
                        <Card.Footer className="text-muted">By user: {myReview.userPosting.username}</Card.Footer>
                    </Card>
                </div>
            )}

        </>
    )
}

export default HomePage;