const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => console.log("Mongo connection open!")) 
    .catch((err) => {
        console.log("Mongo connection error!!");
        console.log(err);
    })

const sample = (array) =>  array[Math.floor(Math.random() * array.length)]

const seedDB = async() => {
    await Campground.deleteMany({});
    
    for(let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const randomPrice = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            images: [
                {
                  url: 'https://res.cloudinary.com/dand7tase/image/upload/v1747640051/YelpCamp/vqfpphlgrmxsp7arsnqh.jpg',
                  filename: 'YelpCamp/vqfpphlgrmxsp7arsnqh',
                },
                {
                  url: 'https://res.cloudinary.com/dand7tase/image/upload/v1747640118/YelpCamp/dnoj4dwhcqjpr0hvanbt.jpg',
                  filename: 'YelpCamp/dnoj4dwhcqjpr0hvanbt',
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum impedit dolorem neque, corrupti ipsa sequi quasi quibusdam minima veniam assumenda, dignissimos deleniti adipisci eius id mollitia voluptatem? Beatae, quasi praesentium?',
            price: randomPrice,
            author: '681af3bb1c48c75ea98a85c8',
            geometry: {
                type: 'Point',
                coordinates: [ cities[random1000].longitude,  cities[random1000].latitude]
            }
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});