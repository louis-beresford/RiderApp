# Fleet Management Rider App

The app is used by riders to carry out delivery tasks and report faults. This application is built using React Native so that it can be deployed on both IOS and Android devices.

The app uses the fleet management API to request and send helpful information. The riders can carry out delivery rounds, report faults, receive bike check prompts and get a quick overview of the fleet map.

## Set up

### Environment Variables

Create an .env file

Add the following lines

'FLEET_API = "your fleet management API server"'

'GOOGLE_API_KEY = "Google maps API key"'

### To install dependencies, run:

'npm install'

## Running the app

### To run via expo

go into the ios directory

'cd /ios'

And execute:

'pod install'

Finally Execute:

'expo r -c'

Then connect via the expo app or simulator.

### To build and deploy full app

follow https://pagepro.co/blog/publishing-expo-react-native-app-to-ios-and-android/
