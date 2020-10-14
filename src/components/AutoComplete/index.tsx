import React, {
  FC,
  useState,
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
  useEffect,
  useRef,
} from 'react'
import cls from 'classnames'
import Input, { InputProps } from '../Input'
import Icon from '../icon'
import useDebounce from '../hooks/useDebounce'
import Transition from '../Transition/transition'
import useClickOutside from '../hooks/useClickOutside'
interface DataSourceObject {
  value: string
}

export type DataSourceType<T = {}> = T & DataSourceObject
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>
  onSelect?: (item: DataSourceType) => void
  renderOption?: (item: DataSourceType) => ReactElement
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props
  const [inputValue, setInputValue] = useState(value as string)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const triggerSearch = useRef(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const componentRef = useRef<HTMLDivElement>(null)
  const debounceValue = useDebounce(inputValue)
  useClickOutside(componentRef, (e: MouseEvent) => {
    setSuggestions([])
  })
  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      setSuggestions([])
      const result = fetchSuggestions(inputValue)
      if (result instanceof Promise) {
        setLoading(true)
        result.then((res) => {
          setLoading(false)
          setSuggestions(res)
          if (res.length > 0) {
            setShowDropdown(true)
          }
        })
      } else {
        setSuggestions(result)
        setShowDropdown(true)
        if (result.length > 0) {
          setShowDropdown(true)
        }
      }
    }
  }, [debounceValue, fetchSuggestions])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    triggerSearch.current = true
    setInputValue(e.target.value)
  }

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    triggerSearch.current = false
    setShowDropdown(false)
    if (onSelect) {
      onSelect(item)
    }
  }

  const highlight = (index: number) => {
    if (index < 0) index = 0
    if (index > suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break
      case 38:
        highlight(highlightIndex - 1)
        break
      case 40:
        highlight(highlightIndex + 1)
        break
      case 27:
        setShowDropdown(false)
      default:
        break
    }
  }

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }
  const generateDropdown = () => {
    console.log(suggestions)
    return (
      <Transition
        timeout={300}
        animation="zoom-in-top"
        in={showDropdown || loading}
        onExited={() => setSuggestions([])}
      >
        <ul className="tb-suggestion-list">
          {loading && (
            <div className="tb-suggestion-loading-icon">
              <Icon icon="spinner" spin />
            </div>
          )}
          {suggestions.map((item, index) => {
            const cnames = cls('suggestion-item', {
              'is-active': index === highlightIndex,
            })
            return (
              <li
                key={index}
                className={cnames}
                onClick={() => handleSelect(item)}
              >
                {renderTemplate(item)}
              </li>
            )
          })}
        </ul>
      </Transition>
    )
  }
  return (
    <div className="tb-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {generateDropdown()}
    </div>
  )
}

export default AutoComplete
