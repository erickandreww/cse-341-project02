const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'School Api',
        description: 'School Api'
    }, 
    host: 'localhost:3000',
    schemes: ['http', 'https']
}; 

const outputfile = './swagger.json'
const endpointsFiles = ['./routes/index.js']

// this will generate swagger.json
swaggerAutogen(outputfile, endpointsFiles, doc); 