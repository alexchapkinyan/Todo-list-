import TokenService from "../services/token-service.js";

export default (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if(!authorizationHeader) {
        return res.status(401).json({ message: 'You are not authorized' });
    };

    const accessToken = authorizationHeader.split(' ')[1];
    const user = TokenService.validateAccessToken(accessToken);

    if(!user) {
        return res.status(401).json({ message: 'You are not authorized' });
    };

    req.user = user

    next()
}