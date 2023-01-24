const { hashPassword } = require('../utils');
const { signupBusinessValidation } = require('../validation');
const { setCookie } = require('../server_side_logic');
const { getUserByEmail, insertUser } = require('../database/query');

const signupController = async (req, res) => {
  const {
    first_name, last_name, email, password, confirm_password, phone_number, birthday, gender, address, role,
  } = req.body;
  try {
    await signupBusinessValidation.validate({
      first_name, last_name, email, password, confirm_password, phone_number, birthday, gender, address, role,
    });
    if (password !== confirm_password) {
      res.status(400).json({ error: 'Password and confirm password must be the same' });
    }
    const data = await getUserByEmail(email);
    if (data.rows.length) {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      const hashedPassword = await hashPassword(password);
      await insertUser(first_name, last_name, email, hashedPassword, phone_number, birthday, gender, address, role);
      await setCookie(req, res, { id: data.rows.id });
      // , role: data.rows[0].role
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = signupController;
