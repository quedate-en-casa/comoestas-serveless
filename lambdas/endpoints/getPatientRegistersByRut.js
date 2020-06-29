const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event', event);

    if (!event.pathParameters || !event.pathParameters.rut) {
        // failed without an rut
        return Responses._400({ message: 'missing the rut from the path' });
    }

    let rut = event.pathParameters.rut;

    const registers = await Dynamo.getItemsByRut(rut, tableName).catch(err => {
        console.log('error in Dynamo Get', err);
        return null;
    });

    if (!registers) {
        return Responses._400({ message: 'Failed to get registers by rut' });
    }

    return Responses._200({ registers });
};
