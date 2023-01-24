const { hashPassword } = require('../utils');
const { signupBusinessValidation, signupIndividualValidation } = require('../validation');
const { setCookie } = require('../server_side_logic');
const { getUserByEmail, insertUser } = require('../database/query');

const signupController = async (req, res) => {
  const {
    first_name, last_name, email, password, confirm_password, phone_number, birthday, gender, address, company_name,
  } = req.body;

  const checkAge = (theBirthday) => {
    const pattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!pattern.test(theBirthday)) {
      res.status(400).json({ error: 'Birthday must be in this format: YYYY-MM-DD Like 2000-01-01' });
    }
    const birthDate = new Date(theBirthday);
    const year = birthDate.getFullYear();
    const dateNow = new Date().getUTCFullYear();
    const eighteenYearsAgo = dateNow - 18;
    if (year > eighteenYearsAgo) {
      res.status(400).json({ error: 'You must be at least 18 years old' });
    }
  };
  checkAge(birthday);

  const genderArr = ['male', 'female', 'other'];
  if (!genderArr.includes(gender)) {
    res.status(400).json({ error: ' Gender should be one of these : male , female , other' });
  }

  let role = 'Individual';
  if (email.includes('@gmail.com')) {
    role = 'Individual';
  } else if (email.includes('@company.com')) {
    role = 'Business';
  } else {
    res.status(400).json({ error: 'Email must be a Individual Or Business email' });
  }

  try {
    if (role === 'Individual') {
      await signupIndividualValidation.validate({
        first_name, last_name, email, password, confirm_password, phone_number, birthday, gender, address, company_name,
      });
    } else {
      await signupBusinessValidation.validate({
        first_name, last_name, email, password, confirm_password, phone_number, birthday, gender, address, company_name,
      });
    }

    if (password !== confirm_password) {
      res.status(400).json({ error: 'Password and confirm password must be the same' });
    }

    const data = await getUserByEmail(email);
    if (data.rows.length) {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      const hashedPassword = await hashPassword(password);
      await insertUser(first_name, last_name, email, hashedPassword, phone_number, birthday, gender, address, role, company_name);
      await setCookie(req, res, { id: data.rows.id });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = signupController;
