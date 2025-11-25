

const logout = (req, res) => {
  const isProduction = process.env.NODE_ENV === "development";
  const token = req.cookies.jwtToken;
  console.log(token);
  res.clearCookie("jwtToken", {
    httpOnly: true,
    secure: isProduction, // must match your signin cookie
    sameSite: isProduction ? "None" : "Lax",
    path: "/", // path must match
  });
  return res.status(200).json({ message: 'User logged out successfully' });
}

module.exports = logout;