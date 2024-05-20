# Quiz on Twitch
QuizOnTwitch is an interactive quiz platform designed specifically for Twitch streamers.


<!-- install -->
## Installation
The project is split into 2 parts, the `./client` and the `./server`.
We will go over installation separatly.


### Client
1. Install packages
   ```sh
   cd ./client
   npm install
   ```
2. Create `.env` file inside the `./client` root directory.
3. The `./client/.env` file should follow the following example:
   
   ```
   REACT_APP_AUTH0_DOMAIN=<your Auth0 domain>
   ```

4. Run the application by the npm scripts: 
   
   from root:
   ```sh
   npm run dev-local-client
   ```

   from `./client`:
   ```sh
   npm run dev
   ```

### Server
1. Install packages
   ```sh
   cd ./server
   npm install
   ```
2. Create `.env` file inside the `./server` root directory.
3. The `./server/.env` file should follow the following example:
   ```
   NODE_ENV="development"
   PORT=<express port>
   SOCKET_PORT=<socket.io port>
   MQ_PORT=<message queue port>
   MQ_URI=<message queue uri>

   MONGO_URL=<MongoDB uri>
   ```

4. Run the application by the npm scripts: 
   
   from root:
   ```sh
   npm run dev-local-server
   ```

   from `./server`:
   ```sh
   npm start
   ```


## Versions
| Version | Library      |
|---------|--------------|
| v5.2    | Vite         |
| v18.2   | ReactJS      |
| v5.2.2  | Typescript   |
| v20.5   | NodeJS       |



## Third-party setups

### Auth0
#### Twitch
### MongoDB

> ###### Bugs with 💜 by ILostMyMedic