
![Logo](https://res.cloudinary.com/di7kiyj3y/image/upload/v1679865543/squiggled-logo-revised_isdwx2.png)


## Description

Squiggled is a whiteboarding application that enables users to capture, annotate, share and download screenshots from their device camera to other users in real-time.

Check out the server in this repository (https://github.com/kimcangho/squiggled-server).

## Demo

Squiggled is live! Give it a go here (https://squiggled.netlify.app).
## Deployment



Some additional details:
- Front-end deployed using Netlify (https://www.netlify.com).
- Back-end deployed using Heroku (https://heroku.com).


## Screenshots

### Landing Page
![Landing Page Screenshot](https://res.cloudinary.com/di7kiyj3y/image/upload/v1679868693/squiggled-landing_lo5oze.png)

### Join Page
![Join Page Screenshot](https://res.cloudinary.com/di7kiyj3y/image/upload/v1679866922/squiggled-join_dxcc4u.png)

### Setup Page
![Setup Page Screenshot](https://res.cloudinary.com/di7kiyj3y/image/upload/v1679866921/squiggled-setup_cc4mcn.png)

### Setup Page - Camera Active
![Setup Page Active Camera Screenshot](https://res.cloudinary.com/di7kiyj3y/image/upload/v1679866923/squiggled-camera_nqzvgj.png)

### Setup Page - Screenshot with annotations
![Setup Page Annotation Screenshot](https://res.cloudinary.com/di7kiyj3y/image/upload/v1679866924/squiggled-annotation_e3cglb.png)

### Setup Page - Active Session
![Setup Page Session Screenshot](https://res.cloudinary.com/di7kiyj3y/image/upload/v1679866925/squiggled-active-session_ejvxvo.png)

### Error Page
![Error Page Screenshot](https://res.cloudinary.com/di7kiyj3y/image/upload/v1679871806/squiggled-error_ax3b0i.png)


## Usage/Examples

### Landing Page

- Start - Redirect to Setup Page.

- Join - Redirect to Join Page.

### Join Page

Input user name and room name into form fields.

- Join Session - Join existing room.

- Back to Home - Redirect to Setup Page.

### Setup Page

Note: Tool tips visible on hover.

#### Header Controls

- Squiggled Logo - Redirect to Landing Page.

- Copy Session Link - Add URL to clipboard in format: https://squiggled.netlify.app/join/:roomId.

#### Control Bar Buttons

- Turn Video On/Off - Toggle device camera on/off.

- Take Screenshot - Capture frame from video and print to whiteboard.

- Clear Screenshot - Clear entire whiteboard.

- Toggle Stamp/Freehand - Switch between circle stamp and freehand drawing tool for whiteboard annotations.

- Erase Drawing - Clear annotations only.

- Download Whiteboard - Download local copy of whiteboard (screenshot and annotations).

#### Session Start form

- Input user name before starting a new session.

- New Session - Create new session with unique room ID (displayed in header).

- End Session - End session and remove all session users from room.

### Error Page

- Take Me Home - Redirect back to Landing Page.

## Run Locally

Clone the project.

To deploy this locally project run:

```bash
  git clone git@github.com:kimcangho/squiggled-client.git
```

Go to the project directory:

```bash
  cd squiggled-client
```

Install dependencies:

```bash
  npm install
```

Start the server:

```bash
  npm start
```

## Lessons Learned

Several key takeaways during the process of building this application include:

- Budgeting more time to flesh out the initial problem space and researching possible implementations of the application. The original vision intended for users to set up a video call and enable either user to tap/click on the video stream to add an object in 3D space. Limitations to developer skill and web technologies necessitated scaling the project down to its current version, where the problem space may still be addressed by sending static images with annotations.

- Leveraging existing design templates to drastically reduce design/styling time. The first build, nicknamed "Qual" dedicated considerable time designing the UI. The discovery of an existing video stream/chat UI kit by 100ms would have expedited the process. 

- Underestimating the complexity of picking up a new technologies/concepts within the allotted time given. Much of the first week was spent figuring out how to integrate WebSockets, WebRTC, networking, canvas,  and media devices into the application. The initial attempt included WebRTC and other libraries to establish video calling, but were removed from the final build.

- Developing for mobile use. The inherent nature of this application needed to establish a connection between two different devices and intended that a user may be able to use the application on a mobile device. For user interaction, click events were converted into pointer events for user.

- Adding buffer time for deployment and testing. The developer was adamant to have a working prototype functional across different devices. One blocker involved a security constraint required that application be hosted on a secure server to enable access to a given device's camera. Ngrok tunneling was used to expose a local development server under an https:// connection prior to deployment.
## Roadmap

Given additional opportunity to revisit this project, the following may be explored:

- Addressing existing bugs/issues:
  - Canvas clearing on window resize.
  - Adjust existing scale of screenshot printed onto canvas. Current screenshots are horizontally compressed.
  - Terminating video track connection when video is toggled off or when redirected out of the setup page.

- Refactoring code base for readability and performance:
  - Conditional rendering for button states.
  - Implement framer-motion React library for streamlined animations (e.g. card flipping).

- Integrating a database to scaffold the following features:
    - Tracking active rooms.
    - Backend input validation.
    - Enable user authentication/authorization.
    - Caller identification.


## Authors

- Kent K.C. Ho ([LinkedIn profile here!](https://www.linkedin.com/in/kentkcho/))


## Acknowledgements

- [100ms Video Conferencing Kit and Live Streaming UI Kit](https://www.figma.com/community/file/1165192525323846383/Video-Conferencing-Kit-and-Live-Streaming-UI-Kit)
- [Readme Editor](https://readme.so)
- BrainStation Education Team (Web Development - Fall 2022): Daniil Molodkov, Nolan Knill, Ani Mihaylova, Pranav Prashar
