import { useEffect } from 'react';
function useClickOutside(ref, handler) {
    useEffect(function () {
        var listener = function (e) {
            if (!ref.current || ref.current.contains(e.target)) {
                return;
            }
            handler(e);
        };
        window.addEventListener('click', listener);
        return function () {
            window.removeEventListener('click', listener);
        };
    }, [ref, handler]);
}
export default useClickOutside;
