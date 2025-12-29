import { useState, useRef, useEffect } from 'react'

export default function EditProfileDropdown({ setImgSrc }) {
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef(null)
    const fileInputRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    function handleUploadFromDevice() {
        fileInputRef.current?.click()
        setOpen(false)
    }

    function handleFileChange(e) {
        const file = e.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = () => {
            setImgSrc(reader.result)
        }
        reader.readAsDataURL(file)
    }

    function handleRemovePhoto() {
        setImgSrc(null)
        setOpen(false)
    }

    return (
        <div
            ref={dropdownRef}
            className={`edit-profile-dropdown ${open ? 'open' : ''}`}
        >
            <button
                type="button"
                className="profile-image-edit-badge"
                onClick={() => setOpen(prev => !prev)}
            >
                <i className="fa-solid fa-pen"></i>
                <span>Edit</span>
            </button>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
            />

            <div className="dropdown-menu">
                <div
                    className="dropdown-item"
                    onClick={handleUploadFromDevice}
                >
                    Upload from Device
                </div>

                <div
                    className="dropdown-item danger"
                    onClick={handleRemovePhoto}
                >
                    Remove photo
                </div>
            </div>
        </div>
    )
}