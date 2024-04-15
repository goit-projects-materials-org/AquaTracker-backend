const currentUser = async (req, res) => {
  const { _id, name, email, avatarURL, gender, weight, activeTime, waterDailyNorma, token, refreshToken } = req.user;
  res.json({ _id, name, email, avatarURL, gender, weight, activeTime, waterDailyNorma, token, refreshToken });
};

module.exports = currentUser;
