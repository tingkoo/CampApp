const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelpCamp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Database Connected!");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const randomNum = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: '5fb289d057f75e21495781fe',
            location: `${cities[randomNum].city}, ${cities[randomNum].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Deserunt suscipit nulla quos distinctio dignissimos modi nesciunt ratione eveniet similique at neque tempora excepturi, doloribus dolores, est quia minus ea libero',
            price: 10,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[randomNum].longitude,
                    cities[randomNum].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dx5d1bbg8/image/upload/v1605661613/YelpCamp/h5ebslsq59b5apjoyvut.jpg',
                    filename: 'YelpCamp/h5ebslsq59b5apjoyvut'
                },
                {
                    url: 'https://res.cloudinary.com/dx5d1bbg8/image/upload/v1605661613/YelpCamp/fixrffbse2iam8zswjn2.jpg',
                    filename: 'YelpCamp/fixrffbse2iam8zswjn2'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    db.close();
})
