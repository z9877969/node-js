export default function getTransactionFormOpts(initialValues, categoryName) {
  return [
    {
      title: 'День',
      type: 'date',
      name: 'date',
      value: initialValues.date,
      isValidate: false,
    },
    {
      title: 'Время',
      type: 'time',
      name: 'time',
      value: initialValues.time,
      isValidate: false,
    },
    {
      title: 'Категории',
      type: 'button',
      name: 'category',
      value: categoryName,
      isValidate: true,
    },
    {
      title: 'Сумма',
      type: 'text',
      name: 'summ',
      value: initialValues.summ,
      isValidate: true,
      placeholder: "Сумма..."
    },
    {
      title: 'Валюта',
      type: 'text',
      name: 'currency',
      value: initialValues.currency,
      isValidate: false,
    },
    {
      title: 'Комментарий',
      type: 'text',
      name: 'comment',
      value: initialValues.comment,
      isValidate: true,
      placeholder: "Комментарий..."
    },
  ];
}
