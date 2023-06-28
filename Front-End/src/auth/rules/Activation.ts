const ruleActivation = {
  required: (value: string) => !!value || 'Este campo es obligatorio',
  email: (value: string) =>
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
    'Escriba un e-mail valido',
};

export default ruleActivation;
