import { configure, addDecorator, addParameters } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import React from 'react'
import '../src/styles/index.scss'

library.add(fas)

const WrapperStyle: React.CSSProperties = {
  padding: '20px 40px',
}

/** 全局生效 */

const storyWrapper = (stroyFn: any) => (
  <div style={WrapperStyle}>
    <h3>组件演示</h3>
    {stroyFn()}
  </div>
)

const loaderFn = () => {
  const allExports = [require('../src/index.stories')]
  const req = require.context('../src/components', true, /\.stories\.tsx$/)
  req.keys().forEach((fname) => allExports.push(req(fname)))
  return allExports
}

addDecorator(storyWrapper)
addDecorator(withInfo)
addParameters({ info: { inline: true, header: false } })

// automatically import all files ending in *.stories.js
configure(loaderFn, module)
