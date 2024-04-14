const currentUser = async (req, res) => {
  const { _id, name, email, avatarURL, gender, waterDailyNorma, token, refreshToken } = req.user;
  res.json({ _id, name, email, avatarURL, gender, waterDailyNorma, token, refreshToken });
};

module.exports = currentUser;
