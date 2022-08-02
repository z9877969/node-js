import moment from 'moment';

export default {
  date: moment().format('YYYY-MM-DD'),
  time: moment().format('HH:mm'),
  category: 'Выберите категорию', 
  summ: '',
  currency: 'RUB',
  comment: '',
};
