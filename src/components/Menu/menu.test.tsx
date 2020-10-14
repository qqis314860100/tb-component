import React from 'react'
import {
  fireEvent,
  render,
  RenderResult,
  cleanup,
  wait,
} from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  classNames: 'test',
}

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  defaultOpenSubMenus: ['4'],
}

const subMenuProps: MenuProps = {
  defaultIndex: '3',
  mode: 'vertical',
  defaultOpenSubMenus: ['3'],
}

const testMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem>test-click</MenuItem>
      <MenuItem>test1-click</MenuItem>
      <MenuItem disabled={true}>disabled</MenuItem>
      {/* <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
      </SubMenu> */}
    </Menu>
  )
}

/** submenu显隐css代码插入test中 */
const createStyleFile = () => {
  const cssFile: string = `
        .tb-submenu{
            display:none;
        }
        .tb-submenu.menu-opened{
            display:block;
        }
    `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}

// wrapper menu组件
let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement

describe('test menu and menuItem component', () => {
  beforeEach(() => {
    wrapper = render(testMenu(testProps))
    wrapper.container.append(createStyleFile())
    menuElement = wrapper.getByTestId('test-menu') as HTMLElement
    activeElement = wrapper.getByText('active') as HTMLElement
    disabledElement = wrapper.getByText('disabled') as HTMLElement
  })
  it('should render correct menu and menuitem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('tb-menu test')
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })

  it('click items should change active and call the right callback', () => {
    const clickItem = wrapper.getByText('test-click')
    fireEvent.click(clickItem)
    expect(clickItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('1')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('2')
  })
  it('should render vertical mode when mode is set to vertical', () => {
    cleanup()
    const wrapper = render(testMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })

  // it('should show dropdown items when hover on submenu', async () => {
  //   /** 为什么这里要用queryByText 因为submenu有可能不存在 */
  //   expect(wrapper.queryByText('drop1')).toBeVisible()
  //   const dropdownElement = wrapper.getByText('dropdown')
  //   /** 此处handleMouse函数点击时有一个定时器的异步操作,这里不会等待而是立马执行，需要加async await */
  //   fireEvent.mouseEnter(dropdownElement)
  //   await wait(() => {
  //     expect(wrapper.queryByText('drop1')).toBeVisible()
  //   })
  //   fireEvent.click(wrapper.getByText('drop1'))
  //   expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
  //   fireEvent.mouseLeave(dropdownElement)
  //   await wait(() => {
  //     expect(wrapper.queryByText('drop1')).not.toBeVisible()
  //   })
  // })

  // it('should default show dropdown item on submenu', () => {
  //     cleanup()
  //     const wrapper = render(testMenu(subMenuProps))
  //     const submenu = wrapper.getByTestId('submenu');
  //     expect(submenu).toHaveClass('menu-opened');
  //     expect(wrapper.queryByText('drop1')).toBeVisible()
  // })
})
