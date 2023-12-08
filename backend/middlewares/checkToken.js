const jwt = require('jsonwebtoken');
const User = require('../models/user');


// methode check token for a user
exports.checkToken = async (req, res, next) => {
    // getting the token in request header
    let token = req.header('authorization');

    if (token) {
        token = token.split('Bearer ')[1]
        console.log("TOKEN", token)

        // on décode le token pour voir le contenu
        const decoded = jwt.verify(token, 'secret_key');
        // on cherche l'utilisateur avec l'id

        const user = await User.findOne({ where: { id: decoded.id } })
        if (user) {
            req.user = user;
            next();
        } else {
            console.log("utilisateur introuvable")
            res.sendStatus(400);
        }

    } else {
        res.sendStatus(400);
    }
}