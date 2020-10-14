import React, { ChangeEvent, useState } from 'react'
import { addDecorator, storiesOf } from '@storybook/react'
import Input from './index'

const DefaultInput = () => {
  const [value, setValue] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  return (
    <Input
      value={value}
      onChange={handleChange}
      placeholder="hello world"
      defaultValue="defaultValue"
    />
  )
}

const IconInput = () => {
  return <Input icon="coffee" defaultValue="hello,everything well better" />
}

const sizeInput = () => (
  <>
    <Input style={{ width: '300px' }} defaultValue="large size" size="lg" />
    <Input style={{ width: '300px' }} placeholder="small size" size="sm" />
  </>
)

const pandInput = () => (
  <>
    <Input
      style={{ width: '300px' }}
      defaultValue="prepend text"
      prepend="https://"
    />
    <Input style={{ width: '300px' }} defaultValue="google" append=".com" />
  </>
)

storiesOf('Input component', module)
  .add('Default', DefaultInput)
  .add('Icon', IconInput)
  .add('Size', sizeInput)
  .add('带前后缀的 Input', pandInput)
