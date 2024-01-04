const { verifyToken, giveUser } = require('../utils/jwt')

async function userMiddleware(req, res, next) {
    try {
        const bearerHeaders = req.headers['authorization'];
        if (bearerHeaders !== undefined) {
            const token = bearerHeaders.split(" ")[1];
            const isValid = verifyToken(token);
            if (isValid) {
                const user = await giveUser(token, 'user');
                req['user'] = user;
                next()
            } else {
                res.status(403).send('User not authorized!');
            }
        }else{
            res.status(403).send('User not authorized!');
        }
    } catch (e) {
        res.status(403).send('User not authorized!');
    }
}

module.exports = userMiddleware;