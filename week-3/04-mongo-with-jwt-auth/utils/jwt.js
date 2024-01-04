const jwt = require('jsonwebtoken');
const { User, Admin } = require("../db/index")
const jwtSecret = process.env.JWT_SECRET_KEY;


function createToken(username) {
    return jwt.sign({ username }, jwtSecret)
}


function verifyToken(token) {
    try {
        jwt.verify(token, jwtSecret);
        return true;
    } catch (e) {
        return false;
    }
}

async function giveUser(token, type) {

    const decodedInfo = jwt.decode(token);
    const { username } = decodedInfo;
    let user;
    if (type === 'user') {
        user = await User.findOne({ username });
    } else {
        user = await Admin.findOne({ username });
    }
    return user;
}


exports.giveUser = giveUser;
exports.createToken = createToken;
exports.verifyToken = verifyToken;


