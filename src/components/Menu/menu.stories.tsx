import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const DefaultMenu = () => {
  return (
    <Menu defaultIndex='0' onSelect={(index) => {action(`clicked ${index} item`)}} >
      <MenuItem>Menu1</MenuItem>
      <MenuItem>Menu3</MenuItem>
      <MenuItem>Menu2</MenuItem>
      <SubMenu title='城市' >
        <MenuItem>北京</MenuItem>
        <MenuItem>上海</MenuItem>
      </SubMenu>
    </Menu>
  )
}

storiesOf('Menu Component', module).add('Menu',DefaultMenu)
