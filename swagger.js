const swaggerAutogen = require('swagger-autogen')();

// 1. Use Render's guaranteed built-in environment variable
const isProduction = process.env.RENDER === 'true';

const doc = {
    info: {
        title: 'Director API',
        description: 'API for managing directors',
    },
    // 2. The switch will now flawlessly detect when it is on Render
    host: isProduction ? 'cse-3410-project3.onrender.com' : 'localhost:3000',
    schemes: isProduction ? ['https', 'http'] : ['http'],
}; 

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js' ]; 


swaggerAutogen(outputFile, endpointsFiles, doc);