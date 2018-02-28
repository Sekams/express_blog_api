# The Nexus Blog API

**The Nexus Blog API** is a RESTful API for serving data persistence methods to The Nexus Blog application.

## Live API
WIP

## Getting Started
To be able to use the application locally, one should follow the guidelines highlighted below.

1. Clone/download the application Github repository by running the command below in a git shell
```
git clone https://github.com/Sekams/express_blog_api.git
```
2. Navigate (cd) to a application root directory and install NPM and Node.js via the terminal (guide [here](https://docs.npmjs.com/getting-started/installing-node))
 
3. Install the application requirements by running the code below in the terminal at the application root directory:
```
npm install
```

4. Install MongoDB (guide [here](https://docs.mongodb.com/manual/installation/))

5. Set up the environment variables in a file named `.env` at the application root directory structured as shown below:
```
export SECRET=<secret key e.g. tvngivginvigbgbtgbvigbirgbi>
yarn dev
```

6. After all the requirements are installed on the local application instance, run the application by running the following code in the terminal at the application root directory:
```
source .env
```
7. After successfully running the application, one can explore the features of The Nexus Blog API by accessing: `http://localhost:<PORT>` (replace `<PORT>` with port number) in any client of choice

## Features
* User Account management (Signup and Signin)
* Blog Post creation, retrieval, updating and deletion
* Blog Post Comment creation, retrieval, updating and deletion

##Screenshots

<img width="1440" alt="screen shot 2018-02-28 at 7 46 59 pm" src="https://user-images.githubusercontent.com/22541550/36800416-8cfeefb8-1cc0-11e8-9fe6-0751fbc3decd.png">
<img width="1440" alt="screen shot 2018-02-28 at 7 46 55 pm" src="https://user-images.githubusercontent.com/22541550/36800457-a901863a-1cc0-11e8-8731-0b45d78eddf4.png">
<img width="1440" alt="screen shot 2018-02-28 at 7 47 13 pm" src="https://user-images.githubusercontent.com/22541550/36800478-b67f1570-1cc0-11e8-914a-acfd2486857e.png">
<img width="1440" alt="screen shot 2018-02-28 at 7 46 31 pm" src="https://user-images.githubusercontent.com/22541550/36800494-bca09b2c-1cc0-11e8-81e1-62c3abc1e4f1.png">
<img width="1440" alt="screen shot 2018-02-28 at 7 46 10 pm" src="https://user-images.githubusercontent.com/22541550/36800515-c2689f64-1cc0-11e8-9144-9054273382b8.png">
<img width="1440" alt="screen shot 2018-02-28 at 7 46 20 pm" src="https://user-images.githubusercontent.com/22541550/36800579-e7008cce-1cc0-11e8-95e1-7c301e4430ab.png">
<img width="1440" alt="screen shot 2018-02-28 at 7 45 55 pm" src="https://user-images.githubusercontent.com/22541550/36800589-eb98754e-1cc0-11e8-9a52-1771d87748bf.png">
<img width="1440" alt="screen shot 2018-02-28 at 7 45 43 pm" src="https://user-images.githubusercontent.com/22541550/36800599-f05f131c-1cc0-11e8-89d7-99d4536e666f.png">


## EndPoints

| Type | API EndPoint | Requires Token | Description |
| --- | --- | --- | --- |
| POST | /api/v1/user/signup | NO | Registers a user and requires **firstName**, **lastName**, **username**, **password** and **email** as string arguments |
| POST | /api/v1/user/signin | NO | Logs regitered users in and requires **username** and **password** as string arguments |
| POST | /api/v1/posts | YES | Creates a new blog post for the logged in user and requires **title** and **body** as string arguments |
| GET | /api/v1/posts | NO | Retrieves all available posts from the database |
| GET | /api/v1/posts/\<pID\> | NO | Retrives a particular blog post with the id **pID** |
| PUT | /api/v1/posts/\<pID\> | YES | Updates a particular blog post with the id **pID** and takes either **title**, **body** or both as string arguments |
| DELETE | /api/v1/posts/\<pID\> | YES | Deletes a particular blog post with the id **pID** |
| POST | /api/v1/posts/\<pID\>/comments | YES | Creates a new comment for a particular blog post with the id **pID** and requires **body** as a string argument |
| GET | /api/v1/posts/\<pID\>/comments | NO | Retrives all comments for a particular blog post with the id **pID** |
| GET | /api/v1/posts/\<pID\>/comments/\<cID\> | NO | Retrives a particular comment with the id **cID** for a particular blog post with the id **pID** |
| PUT | /api/v1/posts/\<pID\>/comments/\<cID\> | YES | Updates a particular comment with the id **cID** for a particular blog post with the id **pID** and requires **body** as a string argument |
| DELETE | /api/v1/posts/\<pID\>/comments/\<cID\> | YES | Deletes a particular comment with the id **cID** for a particular blog post with the id **pID** |


## Testing
The application's tests can be executed by running the code below within the terminal at the application root directory:
```
WIP
```