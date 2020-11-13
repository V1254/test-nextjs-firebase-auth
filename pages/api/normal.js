export default function (req, res) {
  res.status(200).json({
    message: "normal path does not require authentication..",
  });
}
