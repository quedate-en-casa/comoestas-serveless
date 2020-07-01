const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');


const tableName = process.env.tableDoctor;

exports.handler = async event => {
    console.log('event', event);

    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({ message: 'missing the ID from the path' });
    }

    let ID = event.pathParameters.ID;
    const user = JSON.parse(event.body);

    user.ID = ID;
    user.date = new Date().toISOString();

    // var encryptedAES = CryptoJS.AES.encrypt(user.rut, "comoestaskey");
    // console.log(`RUT encriptado: ${encryptedAES}`);
    // user.rut=new String(encryptedAES).toString();

    const newDoctor = await Dynamo.write(user, tableName).catch(err => {
        console.log('error in dynamo write', err);
        return null;
    });

    if (!newDoctor) {
        return Responses._400({ message: 'Failed to write user by ID' });
    }

    return Responses._200({ newDoctor });
};
