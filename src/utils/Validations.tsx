import * as Yup from 'yup';

export const LoginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const SignUPValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Full Name must be at least 3 characters')
    .required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  dob: Yup.string().required('Date of Birth is required'), // dob: Yup.string()
  //   .required('Date of Birth is required')
  //   .test(
  //     'age',
  //     'You must be at least 16 years old to sign up',
  //     function (value) {
  //       if (!value) return false;

  //       // Parse date in DD-MM-YYYY format
  //       const [day, month, year] = value.split('-').map(Number);
  //       if (!day || !month || !year) return false;

  //       const birthDate = new Date(year, month - 1, day);
  //       const today = new Date();
  //       const age = today.getFullYear() - birthDate.getFullYear();
  //       const monthDiff = today.getMonth() - birthDate.getMonth();

  //       // Calculate exact age
  //       const exactAge =
  //         monthDiff < 0 ||
  //         (monthDiff === 0 && today.getDate() < birthDate.getDate())
  //           ? age - 1
  //           : age;

  //       return exactAge >= 16;
  //     },
  //   ),
  number: Yup.string().required('Phone number is required'),
  gender: Yup.string().required('Gender is required'),
  nationality: Yup.string().required('Nationality is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character',
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

export const PersonalInfoValidationSchema = Yup.object().shape({
  weight: Yup.number()
    .typeError('Weight is required')
    .required('Weight is required'),
  height: Yup.number()
    .typeError('Height is required')
    .required('Height is required'),
});
