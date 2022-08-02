import * as Yup from 'yup';

export default Yup.object().shape({
  password: Yup.string()
    .min(5, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  login: Yup.string().email('Invalid email').required('Required'),
});
