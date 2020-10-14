import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Transition from './components/Transition/transition';
import Button from './components/Button';
library.add(fas);
var App = function () {
    var _a = useState(false), show = _a[0], setShow = _a[1];
    return (React.createElement("div", null,
        React.createElement(Menu, { defaultOpenSubMenus: ['4'], defaultIndex: "4", onSelect: function (index) { return console.log(index); } },
            React.createElement(MenuItem, null, "\u6807\u98981"),
            React.createElement(MenuItem, null, "\u6807\u98982"),
            React.createElement(MenuItem, { disabled: true }, "\u6807\u98983"),
            React.createElement(SubMenu, { title: "\u6D4B\u8BD5\u4E0B\u62C9\u5217\u8868" },
                React.createElement(MenuItem, null, "\u5217\u88681"),
                React.createElement(MenuItem, null, "\u5217\u88682"))),
        React.createElement(Button, { btnType: "primary", onClick: function () { return setShow(!show); }, size: "lg" }, "Toggle"),
        React.createElement(Transition, { in: show, timeout: 300, animation: "zoom-in-left" },
            React.createElement("div", null,
                React.createElement("p", null,
                    "Edit ",
                    React.createElement("code", null, "src/App.tsx"),
                    "and save to reload."),
                React.createElement("p", null,
                    "Edit ",
                    React.createElement("code", null, "src/App.tsx"),
                    "and save to reload."))),
        React.createElement(Transition, { in: show, timeout: 300, wrapper: true, animation: "zoom-in-left" },
            React.createElement(Button, { btnType: "primary", size: "lg" }, "change button"))));
};
export default App;
