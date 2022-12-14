# Express Yourself

A place to share and explore others out there like you with a similar passion for fashion. 

Express Yourself allows users to upload their own items of clothing and journey through others with similar tastes or perhaps vastly different styles. Recycling clothes and passing them onto the next helps the earth!

Check it out now. Click [here](https://vintage-store.up.railway.app/) to view via Railway.

## Built Using

 - HTML, CSS & Javascript front end
 - Node.js, Express, EJS
 - MongoDB, Mongoose database manipulation
 - Multer & Cloudinary 
 

## App Functionality

Express Yourself is a full CRUD App incorporating all 7 restful routes below:

 GET - users collections
 NEW - create a new item
 SHOW - display selected item
 POST - new resource
 EDIT - update existing item
 PUT - place edited item back into collection

## Wireframe for App

![Getting Started](public/Images/Screen%20Shot%202022-10-14%20at%201.15.16%20am.png)

Users taken to home page to either login or register. Once authenticated, user is taken to main page where their username is displayed to show who is currently logged in. From here they have access to the item show pages of each users collection as well as their own personalised collections. Non registered users only have access to the main page and will be redirected to the home page if trying to access the show pages.

The initial wireframe I created was adhered to for majority of the project. Late in the project stage I also incorporated another show page to display items logged in users had selected to watch.




## Features

 - Custom CSS styling along with minor Bootsrap styling
 - Upload and edit image functionality using Cloudinary 
 - Data hosted on MongoDB and accessed using Node.js and Mongoose
 - All 7 RESTful utilised
 - Personalisee collection for each registered user
 - Personalised page for items users are watching/following
 - ability to purchase item. Out of stock will appear if sold out


 ## Future Additions

The intended plan was to allow users to trade between one another. I would like to have set up different models like User, ClothingItem and TradeOffer. These include user recipient, user requester along with messages and pending status. 

I would potentially have to set up an email to send to the recipient who would be required to accept and update the status to which the items would swap in the db. T enable this, I would like to explore Nodemailer to assist in passing email notifications also.

## Acknowledgements 

Huge thank you to Dido and Rod for guiding me through this project. Your patience and assistance helped me all the way through and cannot thank you enough for your tireless efforts helping myself and the class every second of the day. Much appreciated!

