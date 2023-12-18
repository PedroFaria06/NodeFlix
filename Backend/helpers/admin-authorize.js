// middleware de autorização admin
const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Operação Não Permitida' });
    }
};

module.exports = {
    authorizeAdmin
};