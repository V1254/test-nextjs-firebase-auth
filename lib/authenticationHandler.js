import jwt from "jsonwebtoken";
const authenticated = (callback) => async (req, res) => {
  let resultStatus = 401,
    error = "sorry you are not authenticated.";
  const cookie = req.cookies.authToken;

  if (!cookie)
    return res.status(resultStatus).json({
      error,
    });

  console.log(`token is ${cookie}`);
  return jwt.verify(cookie, process.env.jwt_secret, async (err, decoded) => {
    if (!err && decoded) {
      return await callback(req, res);
    }

    return res.status(resultStatus).json({
      error,
    });
  });
};

export default authenticated;
