import { Link, usePage } from '@inertiajs/react';
import {useState} from 'react';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { url } = usePage();

    const isActive = (path) => {
        return url === path;
    };

    function openNavbar(){
        setOpen(!open);
    }

    function handleNavigate(){
        setOpen(false);
    }

    return (
        <header>
            <nav className={`container nav ${open ? 'nav-open' : ''}`}>
                <div className="logo">
                    <img src="/assets/logo/logo-transparent.png" alt="Trofes Logo" />
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

                    <div className="nav-action">
                        <Link href="/login">Log In</Link>
                        <Link className="btn btn-pill" href="/sign-up">Sign Up</Link>
                    </div>
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
