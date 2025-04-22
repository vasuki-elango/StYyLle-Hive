const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    
    try {
        const decoded = jwt.verify(token, "vasuki@8123");
        req.userId = decoded.id; 
        next(); // token is valid, go next
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }

}

module.exports=auth