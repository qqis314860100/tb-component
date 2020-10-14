import React, {FC, createContext, useState,CSSProperties } from 'react'
import cls from 'classnames'
import {MenuItemProps} from './menuItem'

type MenuMode = 'horizontal'|'vertical'

type SelectCallback = (selectIndex: string) => void;

export interface MenuProps{
  /**默认 active 的菜单项的索引值 */
  defaultIndex?: string;
  classNames?: string;
  /**菜单类型 横向或者纵向 */
  mode?: MenuMode;
  style?: CSSProperties;
  /**点击菜单项触发的回掉函数 */
  onSelect?: (selectedIndex: string) => void;
  /**设置子菜单的默认打开 只在纵向模式下生效 */
  defaultOpenSubMenus?: string[];
}

interface IMenuContext{
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubMenus?:string[]
}

export const MenuContext = createContext<IMenuContext>({index:'0',defaultOpenSubMenus:[]})

/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单
 * ~~~js
 * import {Menu} from 'tb-menu';
 * ~~~ 
 */

export const Menu:FC<MenuProps> = (props) => {
    const { classNames, mode, style, children, defaultIndex ,onSelect,defaultOpenSubMenus} = props;
    
    const [currentActive, setActive] = useState(defaultIndex);

    const classes = cls('tb-menu', classNames, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode === 'horizontal'
    })

    const handleClick = (index: string) => {
        setActive(index)
        if (onSelect) {
            onSelect(index)
        }
    }

    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus
    }

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            const { displayName } = childElement.type;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, { index: index.toString() })
            } else {
                console.error('Warning:Menu has a child which is not a MenuItem component' )
            }
        })
    }
    return (
        <ul className={classes} style={style} data-testid='test-menu'>
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '1',
    mode:'horizontal'
}

export default Menu;