import firestore from "../../lib/firebase";
import bcrypt from "bcrypt";
export default async function (req, res) {
  const { method, body } = req;

  console.log("nani");
  if (method !== "POST") return res.status(401).json({ message: "no post" });

  let parsedBody;

  try {
    parsedBody = JSON.parse(body);
  } catch (e) {
    // already json
    parsedBody = body;
  }

  const { username, password } = parsedBody;

  const hashed = await bcrypt.hash(password, 10);

  await firestore.collection("Users").doc(username).set({
    username,
    password: hashed,
  });

  res.status(200).json({
    username,
    msg: "Successfully signed up."
  });
}
