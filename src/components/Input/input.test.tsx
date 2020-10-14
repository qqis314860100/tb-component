import React from 'react'
import { render, fireEvent, queryByText } from '@testing-library/react'
import { Input, InputProps } from './index'

const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: 'test-input',
}

describe('test Input component', () => {
  it('should render the correct default Input', () => {
    const wrapper = render(<Input {...defaultProps} />)
    const testNode = wrapper.getByPlaceholderText(
      'test-input'
    ) as HTMLInputElement
    expect(testNode).toBeInTheDocument()
    expect(testNode).toHaveClass('tb-input-inner')
    fireEvent.change(testNode, { target: { value: '23' } })
    expect(defaultProps.onChange).toHaveBeenCalled()
    expect(testNode.value).toEqual('23')
  })
  /** 设置为disabled时返回的值也时true */
  it('should render the disabled Input on disabled property', () => {
    const wrapper = render(<Input disabled placeholder="disabled" />)
    const testNode = wrapper.getByPlaceholderText(
      'disabled'
    ) as HTMLInputElement
    expect(testNode.disabled).toBeTruthy()
  })

  /** 给input的size设置为lg时他的容器要有 input-size-lg 类名*/
  it('should render different input sizes on size property', () => {
    const wrapper = render(<Input placeholder="sizes" size="lg" />)
    const testContainer = wrapper.container.querySelector('.tb-input-wrapper')
    expect(testContainer).toHaveClass('input-size-lg')
  })

  it('should render prepand and append element on prepand/append property', () => {
    const { queryByText, container } = render(
      <Input placeholder="pend" append=".com" prepend="http://" />
    )
    const testContainer = container.querySelector('.tb-input-wrapper')
    expect(testContainer).toHaveClass(
      'input-group input-group-append input-group-prepend'
    )

    // expect(queryByText('https://')).toBeInTheDocument()

    // expect(queryByText('.com')).toBeInTheDocument()
  })
})
