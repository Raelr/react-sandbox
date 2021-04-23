const formData = {
  formData: {
    username: {
      elementType: 'input',
      config: {
        type: 'text',
        placeholder: 'Username',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: 'input',
      config: {
        type: 'password',
        placeholder: 'Password',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    confirmPassword: {
      elementType: 'input',
      config: {
        type: 'password',
        placeholder: 'Password',
      },
      value: '',
      validation: {
        required: true,
        requiredEqualityTo: 'password',
      },
      valid: false,
      touched: false,
    },
  },
  formIsValid: false,
  submitHandler: null,
}

export default formData
