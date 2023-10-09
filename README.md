# Live Form updates (Task submission for the Inter-IIT IBP Project)

This is my submission for the Inter-IIT score-board IBP project.

## Tech Stack

The Tech stack that I have used for this project is:

- React (Typescript) for the front-end.
- NodeJS (Express + socket.io) for the back-end.
- Firebase Firestore for the databasing.

## Features

- Add the score of games, for a given college.
- View the games that have been played by the college.
- Live scoreboard.

## Running this app

### 1. Installing NodeJS and Yarn

If you have already installed NodeJS and Yarn you can skip this section and move on to the next step.

#### Installing NodeJS

1. To install NodeJS, head on to the official [NodeJS site](https://NodeJS.org/en) and install the `18.18.0` version for your operating system.
2. Run the installer and follow the instructions on the screen
3. Once NodeJS is installed, you can verify that it is working by opening a terminal and running the following command:

```
node -v
```

This should print the version of NodeJS running on your system.

**Please note that the following command should also run and print out your npm version:**

```
npm -v
```

#### Installing Yarn

Once NodeJS is installed, you can proceed to install yarn. You can do that by running the following command:

```
npm install --global yarn
```

Once installed, you can check the installation by running:

```
yarn --version
```

### 2. Clone and install the dependencies

Open the directory where you wanna clone the repo and run the following command.

```
git clone https://github.com/Karan-Gandhi/Inter-IIT-oCEO-Assignment.git
```

Now to install the dependencies open the cloned directory and run:

```
cd server
yarn install
cd ../client
yarn install
```

### 3. Run the Front-end app

To run the front-end app, you need to open an instance of the terminal and navigate to the directory where you have cloned the repo. You directory should look like this:

```
/client
/server
README.md
```

Now run the following commands:

```
cd client
yarn start
```

This should start the front-end app on port `3000`, and a new browser window should appear.

### 4. Run the Server

To run the server open another instance of the terminal (keep the one where the client is running on) and run the following commands (in the directory of the cloned repo):

```
cd server
yarn build
yarn start
```

This should start the server on port `5000`.

Now you should be able to see the form and the scoreboard.
