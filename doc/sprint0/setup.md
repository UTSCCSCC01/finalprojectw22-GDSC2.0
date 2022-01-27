## Run App Locally

1. Ensure [Node.js](https://nodejs.org/en/) is installed locally

2. Add .env file in root dir with the following (port to run api on and mongoDB connection uri:

    ```
    PORT=5000
    MONGO_URI=mongodb+srv://group_user:vsw1fokgrHs3OJK6@cluster0.5bbyy.mongodb.net/gdscutm?retryWrites=true&w=majority 
    ```

3. Cd into frontend directory, in cmd prompt/terminal, run:
    
    ```
    npm install
    ```

4. Cd back to root directory, in cmd prompt/terminal, run:

    ```
    npm install
    ```


5. Start web server and api on two different ports. In root directory run:

    ```
    npm run dev
    ```

6. Open localhost:3000 in any web browser (web server)