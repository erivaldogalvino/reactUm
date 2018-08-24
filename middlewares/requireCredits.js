module.exports = (req, res, next) => {
    if (req.user.credits < 1) {
        return res.status(403).send({ error: 'Credito insuficiente!' });
    }
    next();
};

// range 400 até 499  indica que um request fez algo errado
// ver:
// www.w3.org Protocols 10 Status Code Definitios