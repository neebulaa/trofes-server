import { useState, useRef, useEffect } from 'react'

export default function CustomDatalist({
    label,
    options,
    value = [],
    onChange,
    placeholder = 'Search...'
}) {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const ref = useRef(null)

    useEffect(() => {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // remove already selected items
    const filteredOptions = options.filter(opt =>
        opt.label.toLowerCase().includes(query.toLowerCase()) &&
        !value.some(v => v.value === opt.value)
    )

    function handleSelect(option) {
        onChange([...value, option])
        setQuery('')
        setOpen(false)
    }

    function handleRemove(optionValue) {
        onChange(value.filter(v => v.value !== optionValue))
    }

    return (
        <div className="input-group" ref={ref}>

            {/* Selected items */}
            {value.length > 0 && (
                <div className="list-items">
                    {value.map(item => (
                        <span key={item.value} className="list-item">
                            {item.label}
                            <button
                                type="button"
                                onClick={() => handleRemove(item.value)}
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            )}

            <input
                type="text"
                value={query}
                placeholder={placeholder}
                onFocus={() => setOpen(true)}
                onChange={(e) => {
                    setQuery(e.target.value)
                    setOpen(true)
                }}
            />

            {open && (
                <div className="datalist-dropdown">
                    {filteredOptions.length === 0 ? (
                        <div className="datalist-empty">No results</div>
                    ) : (
                        filteredOptions.map(option => (
                            <div
                                key={option.value}
                                className="datalist-item"
                                onClick={() => handleSelect(option)}
                            >
                                {option.label}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}
