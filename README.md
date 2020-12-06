# OneTimeChat
https://otch.herokuapp.com

1. My first application written with react, node.js ...
2. Basic authentication and authorization is present here with passport js.
3. Data is stored in MySQL database

- In this chat, you can:
  1. send text messages and files.
  2. create chats
  3. add users to chat
  4. change user settings.

##### To run the project locally, you need:

- you must have **node.js, npm, mysql** installed
- git clone https://github.com/Iluhaprog/Otch.git
- go to the **client/** directory and enter the ***npm install*** command, similar to the **server/** directory
- go to **db/** directory go to mysql with terminal and write the command ***source ./otchDB.sql***
- go to the **server/src/** config directory and open the **db.js** file and enter your *mysql username* in the user field, and your *mysql password* in the password field
- create an **.env** file in the **server/** directory and enter *DROP_BOX_TOKEN* and *DROP_BOX_FOLDER* into it
- go to the **client/** directory and enter the ***npm run dev command***, with **server/** similarly