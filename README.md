# Discord Clone:

A chatting and video calling app.

## Contents:

1. [TechStack](#tech-stack)
2. [Image](#image)
3. [Requirements](#requirements)
4. [Features](#features)
5. [Possible Extensions](#possible-extension)

<a id="tech-stack"></a>

## Tech Stack:

1. React with TypeScript for UI.
2. Redux (Thunk for async dispatches) for state management.
3. Go backend (Gorilla websockets, chi router).
4. MySQL Database.
5. JWT Based authentication.
6. Material UI for styling.

<a id="image"></a>

## Image:

<img src="./img.png" />

<a id="requirements"></a>

## Requirements:

1. `.env` file in backend folder:
   1. PORT=4000
   2. USER1=your-db-username
   3. DB=your-db-name
   4. KEY=key-for-jwt-signing
2. Database requirements:
   1. MySQL Database.
   2. Tables:
      1. users - Stores users:
         1. id int AUTO_INCREMENT PRIMARY KEY
         2. email varchar(100) NOT NULL UNIQUE
         3. username, varchar(100) NOT NULL
         4. password varchar(100) NOT NULL
      2. friendinvites - Stores invitations sent to user.
         1. sender varchar(100) NOT NULL
         2. receiver varchar(100) NOT NULL
         3. status varchar(30) NOT NULL
         4. PRIMARY KEY(sender, receiver)
         5. FOREIGN KEY (sender) REFERENCES users(email)
         6. FOREIGN KEY (receiver) REFERENCES users(email)
      3. chatMessages - Stores chat messages sent from one user to another:
         1. roomId varchar(50) NOT NULL
         2. createdBy int NOT NULL
         3. email varchar(100) NOT NULL
         4. username varchar(100) NOT NULL
         5. date varchar(100) NOT NULL
         6. message text
         7. FOREIGN KEY (createdBy) REFERENCES users(id)
      4. videorooms - Stores video groups created by a user:
         1. roomId varchar(100) PRIMARY KEY
         2. createdBy varchar(100)
         3. roomLabel varchar(100)
      5. joinedvideorooms - Stores how many people are eligible to enter a room:
         1. roomId varchar(100)
         2. mail varchar(100)
         3. FOREIGN KEY (roomId) REFERENCES videorooms(roomId)
         4. PRIMARY KEY (roomId, mail)

<a id="features"></a>

## Features:

1. Login/Register Functionality.
2. Friend Requests:
   1. Sending / Receiving them.
   2. Accepting / Rejecting them.
3. Websocket based functionality:
   1. Updating Friends List.
   2. Updating Friend Requests List.
   3. Updating the indicator whenever a friend comes online or goes offline.
   4. Chatting with friends.
4. Video calling using WebRTC.
   1. Multi user group video video call.
      1. Mesh architecture is used to setup peer connections hence it is not advised to have more than 4 ppl in a video group.
      2. Another way exists which requires some video processing on the sever side. (Not implemented)
   2. To call a friend first send him the video room id, after joining the room. A friend can enter the room.
   3. Audio and Video can be shut off. It is on by default.
   4. The code does not handle the scenario if a user does not have a camera and only wishes to join with audio. (Not implemented)
   5. Screen Sharing funtionality is there but sharing your camera stream along with screen share is not implemented. Sharing screen shuts off the camera video and vice versa.

<a id="possible-extensions"></a>

## Possible Extension:

1. Add joining via audio only. (for users who do not have a camera)
2. Replace Mesh architecture for managing multiple users and use server methods - requires video processing on the server.
3. Option to send and recieve video call messages like on messengers or whatsapp.
4. Use a TURN server. The project does not use one hence it is possible that when it is deployed video chat might not work due to NATing.
