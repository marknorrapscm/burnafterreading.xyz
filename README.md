## BurnAfterReading.xyz

### 🚀 What is this?

This is a mono-repo containing the complete source code for [www.burnafterreading.xyz](https://www.burnafterreading.xyz).

### 💻 How is it made?

The `backend/` is built using [Serverless Framework](https://www.serverless.com/) and targets AWS. It creates an API that the `frontend/` interacts with.

The `frontend/` is a React app created using [create-react-app](https://github.com/facebook/create-react-app).

### ☁ What does the website do?

It lets the user create a text or audio note that will self-destruct based on settings specified during creation. Typically, a note will be created that can only be read or listened to once. A unique URL is generated that the user can share with whoever; once that URL is loaded and the note is displayed, the note cannot be read again.