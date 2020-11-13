import authenticated from "../../lib/authenticationHandler";

export default authenticated(async function (req, res) {
  // only enter here if the user is authenticated
  res.status(200).json({
    messsage: `Ahoy from our restricted api :D 😜`,
  });
});
