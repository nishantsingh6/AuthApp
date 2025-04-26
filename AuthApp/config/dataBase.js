const mongoose = require('mongoose');

const dbConnect =  async () => {
    await mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log("DB Connect Successfully");
    }).catch((error) => {
        console.log(error);
        console.log('GOT ERROR TO CONNECT DB');
        process.exit(1);
    });
};

module.exports = dbConnect;