import firestore from "../../lib/firebase";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default async function (req, res) {
  const { method, body } = req;

  if (method !== "POST") return res.status(401).json({ message: "only post buddy" });

  let parsedBody;

  try {
    parsedBody = JSON.parse(body);
  } catch (e) {
    // already json 
    parsedBody = body;
  }

  const { username, password } = parsedBody;

  // TODO: make sure the above params actually exist otherwise error :(

  const usersRef = firestore.collection("Users");
  const userToLoginSnapshot = await usersRef.where("username", "==", username).get();

  if (userToLoginSnapshot.empty) {
    return res.status(401).json({
      error: `THe user ${username} is not registered on this service`,
    });
  }

  const { password: dbPassword, role } = userToLoginSnapshot.docs[0].data();
  const isValidLogin = await bcrypt.compare(password, dbPassword);

  if (isValidLogin) {
    const claims = { username, role };
    const token = jwt.sign(claims, process.env.jwt_secret, { expiresIn: "2h" });

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("authToken", token, {
        httpOnly: true, // js should not be able to read the cookies
        secure: process.env.NODE_ENV !== "development", // transfer over https if not in development
        sameSite: true, // strict
        maxAge: 7200, // match the jwt
        path: "/", // root of our domain, otherwise this will map to /api
      })
    );

    res.status(200).json({
      message: "Sucessfully Authenticated!",
    });
  } else {
    res.status(404).json({
      error: "invalid credentials",
    });
  }
}
