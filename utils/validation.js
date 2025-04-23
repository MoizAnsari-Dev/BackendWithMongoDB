import validator from 'validator'


const validateSignupData = (req) => {
  const { firstName, lastName, email, password } = req.body;
  
  if (!firstName || !lastName) {
    throw new Error('Name is Not define')
  } else if (!validator.isEmail(email)) {
    throw new Error('Email is not Define Please cheak the email')
  } else if (!validator.isStrongPassword(password)) {
    throw new Error('please enter the stronge password')
  }
  
};


export {
    validateSignupData
}