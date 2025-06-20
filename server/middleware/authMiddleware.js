const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Expect header in format: Bearer <token>
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // this usually includes { id: user._id }
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid Token' });
    }
};

module.exports = verifyToken;
