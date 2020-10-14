import { useState, useEffect } from 'react';
function useDebounce(value, delay) {
    if (delay === void 0) { delay = 300; }
    var _a = useState(value), debounceVal = _a[0], setDebounceVal = _a[1];
    useEffect(function () {
        var timer = window.setTimeout(function () {
            setDebounceVal(value);
        }, delay);
        /** React 会在执行当前 effect 之前对上一个 effect 进行清除 .React 会在组件卸载的时候执行清除操作*/
        return function () {
            clearTimeout(timer);
        };
    }, [value, delay]);
    return debounceVal;
}
export default useDebounce;
