import { Link, useForm } from '@inertiajs/react'
import { useState, useRef, useEffect } from 'react'

export default function ProfileDropdown({ user }) {
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef(null)

    const { post, processing } = useForm()

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSignOut = (e) => {
        e.preventDefault()

        post('/sign-out')
    }

    return (
        <div
            ref={dropdownRef}
            className={`profile-dropdown ${open ? 'open' : ''}`}
        >
            <div
                className="user-profile"
                onClick={() => setOpen(prev => !prev)}
            >
                <img
                    src={user.profile_image
                        ? user.profile_image
                        : './assets/sample-images/default-profile.png'}
                    alt={`profile-${user.username}`}
                />
            </div>

            <div className="dropdown-menu">
                <div className="profile-dropdown-desc">
                    <img
                        src={user.profile_image
                            ? user.profile_image
                            : './assets/sample-images/default-profile.png'}
                        alt={`profile-${user.username}`}
                    />
                    <div className="profile-info">
                        <h4>{user.username}</h4>
                        <p>{user.full_name}</p>
                    </div>
                </div>

                <div className="dropdown-item">
                    <i className="fa-regular fa-user"></i>
                    <Link href="/profile">Profile</Link>
                </div>

                <div className="dropdown-item">
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    <button
                        type="button"
                        onClick={handleSignOut}
                        disabled={processing}
                        className="signout-btn"
                    >
                        {processing ? 'Signing out...' : 'Sign Out'}
                    </button>
                </div>
            </div>
        </div>
    )
}
