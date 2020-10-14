import React, { useState } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Transition from './components/Transition/transition'
import Button from './components/Button'

library.add(fas)

const App: React.FC = () => {
  const [show, setShow] = useState(false)

  return (
    <div>
      <Menu
        defaultOpenSubMenus={['4']}
        defaultIndex="4"
        onSelect={(index) => console.log(index)}
      >
        <MenuItem>标题1</MenuItem>
        <MenuItem>标题2</MenuItem>
        <MenuItem disabled>标题3</MenuItem>
        <SubMenu title="测试下拉列表">
          <MenuItem>列表1</MenuItem>
          <MenuItem>列表2</MenuItem>
        </SubMenu>
      </Menu>
      <Button btnType="primary" onClick={() => setShow(!show)} size="lg">
        Toggle
      </Button>
      <Transition in={show} timeout={300} animation="zoom-in-left">
        <div>
          <p>
            Edit <code>src/App.tsx</code>and save to reload.
          </p>
          <p>
            Edit <code>src/App.tsx</code>and save to reload.
          </p>
        </div>
      </Transition>
      <Transition
        in={show}
        timeout={300}
        wrapper={true}
        animation="zoom-in-left"
      >
        <Button btnType="primary" size="lg">
          change button
        </Button>
      </Transition>
    </div>
  )
}

export default App
