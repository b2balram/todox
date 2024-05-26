const DescopeClient = require('@descope/node-sdk').default

const descopeClient = DescopeClient({ projectId: process.env.DESCOPE_PROJECT_ID });

exports.authMiddleware = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization || ""

        const sessionToken = authorizationHeader.split(" ")[1] || ""

        if (sessionToken === "") {
            res.status(400).json({ "message": "Unauthenticated user" })
            return
        }

        req.authInfo = await descopeClient.validateSession(sessionToken);

        next();
    } catch (e) {
        console.error(e);
        res.status(401).json({ error: "Unauthorized!" });
    }

}