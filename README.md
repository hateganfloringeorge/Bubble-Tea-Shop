# Bubble Tea Shop

This is a web application designed for any type of store/restaurant with a lot of backend functionalities.

# Table of content

* [Requirements](#requirements)
* [Setup](#setup)
* [Usage](#usage)
* [API](#api)
    * [Users](#Users)
    * [Reviews](#reviews)
    * [Questions](#questions)
* [License](#license)

## Requirements

* [Docker](https://www.docker.com/)
* [Node.js](https://nodejs.org/en/)

## Setup

After installing Docker and Node.js you must go to the root of the respository and type:

```bash
npm i
cd Front_end
npm i

```
Where the npm i command installs all dependencies.The back end and front end are separated for clarity so need to do it two times.

To be able to use all of the functionalities, the .env file needs to be updated with a vaild email user and password. This will be the account that will send emails to the rest of the users on behalf of the company so personal email is not advised (only for testing purposes).


```python
#Email CONFIG
EMAIL_USER=#TODO
EMAIL_PASS=#TODO
```

In order the email sending to work you have to set it from the settings to let less secure apps use it, as described [here](https://nodemailer.com/usage/using-gmail/).

## Usage

In order to start move to the root of the repository and use:

```bash
docker-compose up
cd Front_end
npm run start
```

## API

>## Info

There are 4 user types that can interact with the website: 
+ admin
+ support
+ u+acc (user with account)
+ u-acc (user without account)

>## Users

**GET /api/v1/users/** - Get a list of all users (only for testing purposes)

**Permission** - admin

**Response** - List of JSON objects representing all the users from database

---


**GET /api/v1/users/confirmation/:id** - Confirm email address for user with id in params

**Response** - String

    Email address confirmed!
---


**POST /api/v1/users/register** - Register a user

**Body** - json
    
    {
        username: String
        password: String
        email: String
    }
    
**Response** - String
    Please, comfirm your email address!
---


**POST /api/v1/users/registerAdmin** - Register an admin or support (only for testing purposes)

**Body** - json
    
    {
        username: String //admin - for admin, support - for support
        password: String
    }

---


**POST /api/v1/users/login** - Login a user

**Body** - json
    
    {
        username: String
        password: String
    }

**Response** - String

    JWT_TOKEN
---


>## Reviews

**GET /api/v1/reviews** - Get all the reviews from the database
    
**Response** - List of JSON objects

---


**GET /api/v1/reviews/:id** - Get the review with the id in params

**Permission** - admin

**Response** - JSON with the review

---

**GET /api/v1/reviews/change/:id** - Alternates the boolean value of showOnSite variable from the review with the id in params 

**Permission** - admin, support

---


**GET /api/v1/reviews/user/:id** - Get all the reviews from the user with the id in params 

**Permission** - admin

**Response** - List of JSON objects

---

**POST /api/v1/reviews** - Add a review

**Permission** - admin, support, u+acc

**Body** - json
    
    {
        userPosting: String // representing an user ID
        message: String
        rating: Number // Values 1 - 10
    }

---

**PUT /api/v1/reviews/:id** - Changes the info for the review with the id in params 

**Permission** - admin, support

**Body** - json
    
    {
        userPosting: String // representing an user ID
        message: String
        rating: Number // Values 1 - 10
        showOnSite: Boolean
    }

---

**DELETE /api/v1/reviews/:id** - Deletes the review with the id in params

**Permission** - admin

---

>## Questions

**GET /api/v1/questions** - Get all the questions from the database
    
**Response** - List of JSON objects

---


**GET /api/v1/questions/:id** - Get the question with the id in params

**Permission** - admin

**Response** - JSON with the review

---

**GET /api/v1/questions/change/:id** - Alternates the boolean value of faq variable from the review with the id in params 

**Permission** - admin, support

---


**GET /api/v1/questions/authors/:id** - Get all the questions from the user with the id in params 

**Permission** - admin

**Response** - List of JSON objects

---

**POST /api/v1/questions** - Add a question

**Permission** - admin, support, u+acc

**Body** - json
    
    {
        userPosting: String // representing an user ID
        comment: String
    }

---

**PUT /api/v1/questions/:id** - Adds a reply to the question with the id in params and then notices the user that posted it with an email


**Permission** - admin, support

**Body** - json
    
    {
        reply: String
    }

---

**DELETE /api/v1/questions/:id** - Deletes the question with the id in params

**Permission** - admin

---

## License
[CC BY-NC-ND](https://creativecommons.org/licenses/by-nc-nd/4.0/)
