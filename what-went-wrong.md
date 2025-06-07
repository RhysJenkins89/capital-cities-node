#Everything, probably

In this file I'll note down errors and mistakes that occured throughout the process of building the app. And there are many.

// Using Insomnia, I sent a get request to the /ocenia route, which is a typo. The correct route is oceania. Doing so posted an empty collection to my MongoDB. What is going on?
// Moreover, hitting an undefined route with a get request returns an empty array, instead of a properly handled error.
// This is it: somehow, the get request is posting to my MongoDB. This is weird.

// My theory: mongoose is searching for the collection. It doesn't exist. Instead of sending back an error, it creates the collection and sends back the data, which in this case is an empty array.

// Note userConfidence. Because userConfidence is a number, it is possble that the frontend will send 0, which is a falsy value. In the case of !userConfidence, 0 would fit this criteria, and so the function would return a status of 400
