require('dotenv').config();

const productsData = require('./data/products');
const connectDB = require('./config/db');
const Product = require ('./models/product');

connectDB();

const importData = async () => {
    try{
        await Product.deleteMany({});

        await Product.insertyMany(productsData);

        console.log("Data Import Success.")

        process.exit();

    } catch (err){
        console.error("Error with data import.")
        process.exit(1);
    }
};

importData();
