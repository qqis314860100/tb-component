import React, { FC, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import classnames from 'classnames'

export type ButtonSize = 'lg' | 'sm'

export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
  /** 设置 button 的类名 */
  className?: string
  /** 设置 button 的禁用 */
  disabled?: boolean
  /** 设置 button 的尺寸 */
  size?: ButtonSize
  /** 设置 button 的类型 */
  btnType?: ButtonType
  children: React.ReactNode
  href?: string
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>

type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

/**
 * ## Button Header
 * ~~~js
 * import {Button} from 'tb-component'
 * ~~~
 */

export const Button: FC<ButtonProps> = (props) => {
  const {
    btnType,
    disabled,
    className,
    size,
    children,
    href,
    ...restProps
  } = props
  const cls = classnames(
    'btn',
    {
      [`btn-${btnType}`]: btnType,
      [`btn-${size}`]: size,
      disable: btnType === 'link' && disabled,
    },
    className
  )
  if (btnType === 'link' && href) {
    return (
      <a className={cls} href={href} {...restProps}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={cls} disabled={disabled} {...restProps}>
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default',
  size: 'sm',
}

export default Button
