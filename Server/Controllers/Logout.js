

const logout = (req, res) => {
  const token = req.cookies.jwtToken;
  console.log(token);
  res.clearCookie('jwtToken', { path: "/" });
  return res.status(200).json({ message: 'User logged out successfully' });
}

module.exports = logout;