<div id="top"></div>

# Educatify

## This is a simple E-learning website made using MERN stack. For authentication part firebase have been used.

This consists adding new users, authentication of users, adding courses, buying courses, adding courses to cart and more basic functionality.

### Built With

- [React.js](https://reactjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [Nodejs](https://nodejs.org/en/)
- [Bootstrap](https://getbootstrap.com)
- [Firebase](https://firebase.google.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/divya-yadv/E-learning-Web-App.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

The demo of this website is live on https://educatify-edu.herokuapp.com/

### main features

- Login with email and password, email verification will be required in this case
- login with google
- logout
- An account can be used for teacher as well as for students
- teacher has a seperate dashboard where created courses can be seen
- teacher can edit the course
- courses can be added into cart
- students can add item in cart without login too (will be stored in localstorage) all items will be added in cart after login
- first video of course will be accessible when course is not buyed
- buyed courses, in cart courses will also be available in allcourses page
- in order to access whole course student must buy course
- profile details can be edit through update button like user_name,name, profile picture at dashboard
- for logged in users name will be visible at navbars

### features wish to include in future

- payment system
- update individual course
- multiple videos in one section
- comments and ratings system
- search bar implementation
- Right now there is some problem with video playing will be that (thumbnail is there instead of video)

### Home page without login (/)

![image](https://user-images.githubusercontent.com/90103759/174440209-9e305fae-954b-482c-809c-a02e74ba6511.png)

### All courses page without login (/allcourses)

![image](https://user-images.githubusercontent.com/90103759/174440274-de5f909d-3c8a-4074-8af7-e2679ea1687f.png)

### cart page without login (/cart)

![image](https://user-images.githubusercontent.com/90103759/174440296-70a3ce33-8e62-4e80-926d-f61a322f657a.png)

### Sign up page (/signup)

![image](https://user-images.githubusercontent.com/90103759/174440341-010010a6-e084-4ad0-927b-9a7aac428ce9.png)

### Sign in page(/signin)

![image](https://user-images.githubusercontent.com/90103759/174440829-f033a9df-4d5b-4c8b-9e86-5abf5e74e179.png)

### email verification while signup with email id

![image](https://user-images.githubusercontent.com/90103759/174441354-81379844-a814-4a1b-a908-8b7cb6883b17.png)
![image](https://user-images.githubusercontent.com/90103759/174441446-df81c1fa-a254-4e11-a56f-173a6a6202de.png)

### Dashboard (/dashboard)

![image](https://user-images.githubusercontent.com/90103759/174441488-bf73eaa2-449b-44bd-aa15-1dc20725e270.png)

### update profile (/updateprofile)

![image](https://user-images.githubusercontent.com/90103759/174441520-873344b6-932b-4d34-8ab9-52b83178dbe7.png)

### teacher dashboard (/teacherdashboard)

![image](https://user-images.githubusercontent.com/90103759/174441558-056009a2-562b-4a44-867e-03e113d0da38.png)

### create course page (/teach/createnewcourse)

![image](https://user-images.githubusercontent.com/90103759/174441608-a7c358b4-9dbd-435c-bad1-dae179130391.png)

### create course page with content

![image](https://user-images.githubusercontent.com/90103759/174441799-cc7ae2dc-13c2-4b57-9b5d-9dac09dcc839.png)

### after creating course

![image](https://user-images.githubusercontent.com/90103759/174442756-f5b8021f-257b-4147-99fd-729e6297f811.png)

### update course(/courses/update/slug/web-developement-course)

![image](https://user-images.githubusercontent.com/90103759/174442800-138e7979-a585-454d-a050-ae54d332de2b.png)

### cart after adding course (/cart)

![image](https://user-images.githubusercontent.com/90103759/174442838-c29852cb-27de-48e9-966e-10187605878a.png)

### all courses screen after adding courses in cart(/allcourses)

![image](https://user-images.githubusercontent.com/90103759/174442868-39e572e7-9f4b-4523-b5f5-7085a0ab4e3a.png)

### after removing one course

![image](https://user-images.githubusercontent.com/90103759/174442894-f4ba460d-c2fc-4e2a-9d82-bf07ff56596e.png)

### payment screen (/payment)

![image](https://user-images.githubusercontent.com/90103759/174442914-a9db1fd9-6cd8-4f62-ba16-b895abc623eb.png)

### after payment (/payment)

![image](https://user-images.githubusercontent.com/90103759/174442942-a6ae58c9-8ce8-4b87-8642-3b6956b0704a.png)

### after buying course allcourses screen (/allcourses)

![image](https://user-images.githubusercontent.com/90103759/174442967-793f8d92-c454-4cab-bb3e-4d69fc898e00.png)

### will be visible on dashboard (/dashboard)

![image](https://user-images.githubusercontent.com/90103759/174442990-5fc4cf35-a51c-4d69-b195-4f3277c6dc44.png)

### coursescreen without buying courses

![image](https://user-images.githubusercontent.com/90103759/174443088-699eea82-d9ba-43f5-8e4b-61097d91a372.png)

### coursescreen after buying course (thumbnail will be visible incase video can't be played)

![image](https://user-images.githubusercontent.com/90103759/174443053-a6d2fd8a-2fb6-43da-aae1-6fa38e4fca15.png)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Divya - https://www.linkedin.com/in/divya-yadav-529b5a213/ - divyayadavg8@gmail.com

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)

<p align="right">(<a href="#top">back to top</a>)</p>
