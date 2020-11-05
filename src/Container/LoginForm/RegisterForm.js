import React, { Component } from 'react'
import Input from '../Input/Input'
class RegisterForm extends Component {
  state = {
    formData: {
      name: {
        value: "",
        validator: {
          minLength: 4,
          maxLength: 20,
          required: true
        },
        error: { status: true, message: "", isTouched: false }
      },
      phoneNumber: {
        value: "",
        validator: {
          minLength: 10,
          maxLength: 10
        },
        error: { status: true, message: "", isTouched: false }
      },
      email: {
        value: "",
        validator: {
          required: true
        },
        error: { status: true, message: "", isTouched: false}
      },
      password: {
        value: '',
        validator: {
          minLength: 6,
          maxLength: 10,
          required: true
        },
        error: { status: true, message: "", isTouched: false }
      },
    },
    isFormValid: false,
  }

  checkValue = (value, rules) => {

    let isValid = true
    let message = ''
    let trimmedValue = value.trim()

    if (rules.required && trimmedValue.length === 0) {
      isValid = false
      message = "กรุณากรอกช่องนี้"
    }
    if (rules.maxLength && trimmedValue.length > rules.maxLength) {
      isValid = false
      message = `ช่องนี้ความยาวต้องไม่เกิน ${rules.minLength} อักษร`
    }
    if (rules.minLength && trimmedValue.length < rules.minLength) {
      isValid = false
      message = `ช่องนี้ต้องมีความยาวอย่างน้อย ${rules.minLength} อักษร`
    }
    return { isValid, message }
  }

  onChangeInput = (e) => {

    const filedName = e.target.name
    const filedValue = e.target.value
    const updateForm = { ...this.state.formData }
    updateForm[filedName].value = filedValue

    let { isValid, message } = this.checkValue(e.target.value, updateForm[filedName].validator)
    updateForm[filedName].error.status = !isValid
    updateForm[filedName].error.message = message
    updateForm[filedName].error.isTouched = true

    let newIsFormValid = true
    for (let fName in updateForm) {
      if (updateForm[fName].validator.required === true) {
        newIsFormValid = !updateForm[fName].error.status && newIsFormValid
      }
    }
    this.setState({
      formData: updateForm,
      isFormValid: newIsFormValid,
    })
  }

  onSubmitForm = (e) => {
    e.preventDefault() //ไม่ให้ Refresh Browser
    console.log(this.state)
  }

  render() {

    const { name, phoneNumber, email, password } = this.state.formData;
    const { isFormValid } = this.state

    return (
      <div className="App App-header">
        <h1>สมัครสมาชิก</h1>
        <div>
          <form onSubmitForm={this.onSubmitForm}>
            {/* ใช้งานแบบเต็นรูปแบบ */}
            {/* <input onChange={this.onChangeInput} value={this.state.name} name="name" placeholder="ชื่อ"/> */}
            <Input
              onChangeInput={this.onChangeInput}
              value={name.value} name="name" placeholder="ชื่อ"
              error={name.error} />

            <Input
              onChangeInput={this.onChangeInput}
              value={phoneNumber.value}
              name="phoneNumber"
              placeholder="เบอร์ติดต่อ"
              error={phoneNumber.error} />

            <Input
              onChangeInput={this.onChangeInput}
              value={email.value} n
              name="email"
              placeholder="อีเมล์"
              error={email.error} />

            <Input
              onChangeInput={this.onChangeInput}
              value={password.value}
              name="password"
              placeholder="รหัสผ่าน"
              error={password.error} />
            {/* <input onChange={this.onChangeInput} value={name.value} name="name" placeholder="ชื่อ" class="Invalid"/>
            <input onChange={this.onChangeInput} value={phoneNumber.value} name="phoneNumber" placeholder="เบอร์มือถือ" />
            <input onChange={this.onChangeInput} value={email.value} name="email" placeholder="อีเมล์" />
            <input onChange={this.onChangeInput} value={password.value} name="password" placeholder="รหัสผ่าน" type="password" /> */}
            <button disabled={!isFormValid} htmlFor="submit">ตกลง</button>
          </form>
        </div>
      </div>
    )
  }
}
export default RegisterForm