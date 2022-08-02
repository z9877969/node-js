import * as Yup from 'yup';

export default Yup.object().shape({
    category: Yup.string().matches(/^(?!(Выберите)[\s](категорию))\w*/, "Input correctly data"),
    summ: Yup.string().matches(/^[1-9][0-9]{0,7}/, "Input correctly data").required("Input sum"),
});