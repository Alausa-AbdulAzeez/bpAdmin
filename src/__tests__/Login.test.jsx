// The input fields for Email and Password should be present and the submit button should be disabled if any of the field is empty

import { fireEvent, render, screen } from '@testing-library/react'
import Login from '../pages/login/Login'
import '@testing-library/jest-dom'

test('Checks if Email input is present', () => {
  render(<Login />)
  const emailInput = screen.getByTestId('emailTestId')
  expect(emailInput).toBeInTheDocument()
})

test('Checks if Password input is present', () => {
  render(<Login />)
  const passwordInput = screen.getByTestId('passwordTestId')
  expect(passwordInput).toBeInTheDocument()
})

test('Checks if button is disabled if any of the input fields are empty', () => {
  render(<Login />)
  const loginBtn = screen.getByTestId('loginBtn')
  expect(loginBtn).toBeDisabled()
})

test('Button should not be disabled both fields are ont empty', () => {
  render(<Login />)
  const passwordInput = screen.getByTestId('passwordTestId')
  const emailInput = screen.getByTestId('emailTestId')

  const emailTestValue = 'a@gmail.com'
  const passwordTestValue = 'abccde'

  fireEvent.change(passwordInput, { target: { value: passwordTestValue } })
  fireEvent.change(emailInput, { target: { value: emailTestValue } })
  const loginBtn = screen.getByTestId('loginBtn')
  expect(loginBtn).not.toBeDisabled()
})
