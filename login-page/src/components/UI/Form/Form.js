import React, { useState } from 'react'
import Input from '../Input/Input'
import Button from '../Button/Button'
import './Form.css'

const Form = (props) => {
  const [formData, setFormData] = useState(props.formData)

  let formElementsArray = []

  for (let key in formData.formData) {
    formElementsArray.push({
      id: key,
      config: formData.formData[key],
    })
  }

  const onInputUpdatedHandler = ({ target }, elementId) => {
    const updatedValue = target.value
    const updatedFormData = { ...formData.formData }
    const updatedElement = { ...updatedFormData[elementId] }
    updatedElement.value = updatedValue
    updatedElement.valid = isInputValid(updatedValue, updatedElement.validation)
    updatedElement.touched = true
    updatedFormData[elementId] = updatedElement

    const validForm = isFormValid(updatedFormData)

    setFormData({ ...formData, formData: { ...updatedFormData }, formIsValid: validForm })
  }

  const isInputValid = (value, rules) => {
    let isValid = true

    if (rules == null) return isValid

    if (rules.required) isValid = value != '' && isValid

    return isValid
  }

  const isFormValid = (updatedFormData) => {
    let isFormValid = true
    for (let inputs in updatedFormData) {
      isFormValid = updatedFormData[inputs].valid && isFormValid
    }
    return isFormValid
  }

  console.log(props.formEnabled)
  return (
    <form>
      {formElementsArray.map((formElement) => (
        <Input
          key={formElement.id}
          label={formElement.id}
          config={formElement.config.config}
          elementType={formElement.config.elementType}
          onChange={(event) => onInputUpdatedHandler(event, formElement.id)}
        />
      ))}
      <Button
        isDisabled={!formData.formIsValid || !props.formEnabled}
        onClick={(event) => formData.submitHandler(event, formData)}
      >
        Login
      </Button>
    </form>
  )
}

export default Form
