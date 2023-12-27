
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    info: {
        title: "HRMS",
        version: '1.0.0',
        description: `HRMS API Collection`,
    },
    host: `${process.env.API_HOST}`,
    schemes: ['http', 'https'],
    basePath: '/v1/',
};

const options = {
    swaggerDefinition,
    apis: ['./src/api/auth/auth.route.js', './src/utils/swagger.yml'],
};

module.exports = swaggerJSDoc(options);