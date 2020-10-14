var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useState, useEffect, useRef, } from 'react';
import cls from 'classnames';
import Input from '../Input';
import Icon from '../Icon';
import useDebounce from '../hooks/useDebounce';
import Transition from '../Transition/transition';
import useClickOutside from '../hooks/useClickOutside';
export var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOption = props.renderOption, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "renderOption"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(false), showDropdown = _d[0], setShowDropdown = _d[1];
    var triggerSearch = useRef(false);
    var _e = useState(-1), highlightIndex = _e[0], setHighlightIndex = _e[1];
    var componentRef = useRef(null);
    var debounceValue = useDebounce(inputValue);
    useClickOutside(componentRef, function (e) {
        setSuggestions([]);
    });
    useEffect(function () {
        if (debounceValue && triggerSearch.current) {
            setSuggestions([]);
            var result = fetchSuggestions(inputValue);
            if (result instanceof Promise) {
                setLoading(true);
                result.then(function (res) {
                    setLoading(false);
                    setSuggestions(res);
                    if (res.length > 0) {
                        setShowDropdown(true);
                    }
                });
            }
            else {
                setSuggestions(result);
                setShowDropdown(true);
                if (result.length > 0) {
                    setShowDropdown(true);
                }
            }
        }
    }, [debounceValue, fetchSuggestions]);
    var handleChange = function (e) {
        triggerSearch.current = true;
        setInputValue(e.target.value);
    };
    var handleSelect = function (item) {
        setInputValue(item.value);
        triggerSearch.current = false;
        setShowDropdown(false);
        if (onSelect) {
            onSelect(item);
        }
    };
    var highlight = function (index) {
        if (index < 0)
            index = 0;
        if (index > suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighlightIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            case 13:
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case 38:
                highlight(highlightIndex - 1);
                break;
            case 40:
                highlight(highlightIndex + 1);
                break;
            case 27:
                setShowDropdown(false);
            default:
                break;
        }
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var generateDropdown = function () {
        console.log(suggestions);
        return (React.createElement(Transition, { timeout: 300, animation: "zoom-in-top", in: showDropdown || loading, onExited: function () { return setSuggestions([]); } },
            React.createElement("ul", { className: "tb-suggestion-list" },
                loading && (React.createElement("div", { className: "tb-suggestion-loading-icon" },
                    React.createElement(Icon, { icon: "spinner", spin: true }))),
                suggestions.map(function (item, index) {
                    var cnames = cls('suggestion-item', {
                        'is-active': index === highlightIndex,
                    });
                    return (React.createElement("li", { key: index, className: cnames, onClick: function () { return handleSelect(item); } }, renderTemplate(item)));
                }))));
    };
    return (React.createElement("div", { className: "tb-auto-complete", ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue, onChange: handleChange, onKeyDown: handleKeyDown }, restProps)),
        generateDropdown()));
};
export default AutoComplete;
