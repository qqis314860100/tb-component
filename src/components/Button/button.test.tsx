import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button from '.'

// test('our first react test case ', () => {
//     const wrapper = render(<Button>Nice</Button>)
//     const element = wrapper.queryByText('Nice')
//     expect(element).toBeTruthy()
//     expect(element).toBeInTheDocument()
// })

const defaultProps = {
  onClick: jest.fn(),
}

const testProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'klass',
}

const disabledProps = {
  disabled: true,
  onClick: jest.fn(),
}

describe('test Button Component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument() // 检测元素是否显示在文档
    expect(element.tagName).toEqual('BUTTON') // 检测元素标签是否为button
    expect(element).toHaveClass('btn btn-default') // 检测元素class是否为btn
    expect(element.disabled).toBeFalsy()
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })

  it('should render the correct component based on different props', () => {
    const wrapper = render(<Button {...testProps}>Nice</Button>)
    const element = wrapper.getByText('Nice')
    expect(element).toBeInTheDocument() // 检测元素是否显示在文档
    expect(element).toHaveClass('btn-primary btn-lg klass')
  })

  it('should render a link when btnType equals link and href is provided', () => {
    const wrapper = render(
      <Button btnType="link" href="wwww.baidu.com">
        Link
      </Button>
    )
    const element = wrapper.getByText('Link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })

  it('should render disabled button when button disabled set to true', () => {
    const wrapper = render(<Button {...disabledProps}>Nice</Button>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument() // 检测元素是否显示在文档
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})
