import React, { FC } from 'react'
import { ThemeProps } from '../icon/index'

export interface ProgressProps {
  percent: number
  strokeHeight?: number
  showText?: boolean
  styles?: React.CSSProperties
  theme?: ThemeProps
}

const Progress: FC<ProgressProps> = (props) => {
  const { percent, strokeHeight, showText, styles, theme } = props
  return (
    <div className="tb-progress-bar" style={styles}>
      <div
        className="tb-progress-bar-outer"
        style={{ height: `${strokeHeight}%` }}
      >
        <div
          className={`tb-progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: 'primary',
}

export default Progress
