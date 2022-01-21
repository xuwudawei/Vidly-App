const bcrypt = require('bcrypt');
const { has } = require('lodash');

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(salt);
    console.log(hashedPassword);   
}

hashPassword('123456789');