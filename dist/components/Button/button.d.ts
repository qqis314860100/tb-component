import React, { FC, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
export declare type ButtonSize = 'lg' | 'sm';
export declare type ButtonType = 'primary' | 'default' | 'danger' | 'link';
interface BaseButtonProps {
    /** 设置 button 的类名 */
    className?: string;
    /** 设置 button 的禁用 */
    disabled?: boolean;
    /** 设置 button 的尺寸 */
    size?: ButtonSize;
    /** 设置 button 的类型 */
    btnType?: ButtonType;
    children: React.ReactNode;
    href?: string;
}
declare type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * ## Button Header
 * ~~~js
 * import {Button} from 'tb-component'
 * ~~~
 */
export declare const Button: FC<ButtonProps>;
export default Button;
