import { Link, useForm } from '@inertiajs/react'
import Layout from '../Layouts/Layout'
import { useState } from 'react'

import '../../css/Authentication.css'
import FlashMessage from '../Components/FlashMessage'

export default function SignUp() {
    const [hidePassword, setHidePassword] = useState(true)
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true)

    const { data, setData, post, processing, errors } = useForm({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        remember: true,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/sign-up')
    }

    return (
        <section className="sign-up" id="sign-up">
            <div className="auth-left">
                <Link href="/" className="logo">
                    <img src="/assets/logo/logo-transparent.png" alt="Trofes Logo" />
                </Link>

                <h2>Trofes</h2>
                <p className="subtitle">
                    Buat akun anda dan temukan dunia penuh nutrisi
                </p>

                <div className="wrapper">

                    <form onSubmit={handleSubmit}>
                        <FlashMessage className="mb-1" />
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input
                                id="username"
                                type="text"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                placeholder="sevendeadlysins"
                            />
                            {errors.username && (
                                <small className="error-text">{errors.username}</small>
                            )}
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="emailanda@gmail.com"
                            />
                            {errors.email && (
                                <small className="error-text">{errors.email}</small>
                            )}
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <div className="password-input">
                                <input
                                    id="password"
                                    type={hidePassword ? 'password' : 'text'}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Password"
                                />
                                <span
                                    className="eye-btn"
                                    onClick={() => setHidePassword(p => !p)}
                                >
                                    {hidePassword
                                        ? <i className="fa-solid fa-eye-slash"></i>
                                        : <i className="fa-solid fa-eye"></i>
                                    }
                                </span>
                            </div>
                            {errors.password && (
                                <small className="error-text">{errors.password}</small>
                            )}
                        </div>

                        <div className="input-group">
                            <label htmlFor="password_confirmation">
                                Confirmation Password
                            </label>
                            <div className="password-input">
                                <input
                                    id="password_confirmation"
                                    type={hideConfirmPassword ? 'password' : 'text'}
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData('password_confirmation', e.target.value)
                                    }
                                    placeholder="Confirm Password"
                                />
                                <span
                                    className="eye-btn"
                                    onClick={() => setHideConfirmPassword(p => !p)}
                                >
                                    {hideConfirmPassword
                                        ? <i className="fa-solid fa-eye-slash"></i>
                                        : <i className="fa-solid fa-eye"></i>
                                    }
                                </span>
                            </div>
                            {errors.password_confirmation && (
                                <small className="error-text">
                                    {errors.password_confirmation}
                                </small>
                            )}
                        </div>

                        <div className="checkbox-row">
                            <div className="checkbox-mini">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData('remember', e.target.checked)
                                    }
                                />
                                <label htmlFor="remember">
                                    Ingat saya 30 hari kedepan
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-fill btn-full"
                            disabled={processing}
                        >
                            {processing ? 'Signing up...' : 'Sign Up'}
                        </button>

                        <button type="button" className="btn btn-google btn-full">
                            <img src="/assets/icons/google.png" alt="Google" />
                            Sign Up with Google
                        </button>

                        <p className="signup-cta">
                            Sudah mempunyai akun? <Link href="/login">Login</Link>
                        </p>
                    </form>
                </div>
            </div>

            <div className="auth-right">
                <div className="right-text">
                    <h1>Resep Enak, Pilihan Sehat. Kenali Gizinya</h1>
                    <p>
                        Nikmati hidangan lezat sambil memahami nilai gizi di baliknya.
                        Pelajari cara memilih bahan yang lebih sehat dan membangun
                        kebiasaan makan yang lebih baik setiap hari.
                    </p>
                </div>
            </div>
        </section>
    )
}

SignUp.layout = page => <Layout children={page} />