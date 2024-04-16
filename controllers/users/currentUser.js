const currentUser = async (req, res) => {
  const { name, email, avatarURL, gender, weight, activeTime, waterDailyNorma, token, refreshToken } = req.user;
  res.json({ name, email, avatarURL, gender, weight, activeTime, waterDailyNorma, token, refreshToken });
};

module.exports = currentUser;
