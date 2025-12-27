import { Link, usePage } from '@inertiajs/react';
import Dropdown from './Dropdown';
import ProfileDropdown from './ProfileDropdown';
import { useState } from 'react';

export default function NavbarAuth({user}) {
    const [open, setOpen] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const { url } = usePage();

    const categoryOptions = [
        { label: 'Recipes', value: 'recipe' },
        { label: 'Guides', value: 'guides' },
    ]

    const [category, setCategory] = useState(categoryOptions[0])

    const isActive = (path) => {
        return url === path;
    };

    function openSearchBar(){
        setOpenSearch(!openSearch);
    }

    function openNavbar(){
        setOpen(!open);
    }

    function handleNavigate(){
        setOpen(false);
    }

    return (
        <header id="auth-navbar">
            <nav className={`container nav ${open ? 'nav-open' : ''}`}>
                <div className="logo">
                    <img src="/assets/logo/logo-transparent.png" alt="Trofes Logo" />
                </div>
                
                <div className="nav-search-toggle" onClick={openSearchBar}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>

                <div className={`nav-search-container` + (openSearch ? ' nav-search-open' : '')}>
                    <div className="nav-search">
                        <div className="nav-search-icon">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>

                        <Dropdown
                            options={categoryOptions}
                            value={category}
                            onChange={setCategory}
                        />
                        <input type="text"  placeholder="What are you looking for?" />
                    </div>
                </div>

                <div className="nav-content">
                    <div className="nav-links">
                        <Link
                            href="/"
                            className={isActive('/') ? 'active' : ''}
                            onClick={handleNavigate}
                        >
                            Beranda
                        </Link>

                        <Link
                            href="/search"
                            className={isActive('/search') ? 'active' : ''}
                            onClick={handleNavigate}
                        >
                            Pencarian
                        </Link>

                        <Link
                            href="/guides"
                            className={isActive('/guides') ? 'active' : ''}
                            onClick={handleNavigate}
                        >
                            Panduan
                        </Link>

                        <Link
                            href="/contact-us"
                            className={isActive('/contact-us') ? 'active' : ''}
                            onClick={handleNavigate}
                        >
                            Hubungi Kami
                        </Link>
                    </div>
                </div>

                <div className="nav-content-auth">
                    <button type="button" className="custom-search-btn">
                        <i class="fa-brands fa-searchengin"></i>
                        <p>Custom</p>
                    </button>

                    <ProfileDropdown 
                        user = {user} 
                    />
                </div>

                <button className="hamburger" aria-label="menu" onClick={openNavbar}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>
        </header>
    );
}
