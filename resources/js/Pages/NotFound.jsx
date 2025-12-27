import Layout from "../Layouts/Layout";
import { Link } from '@inertiajs/react';

import '../../css/NotFound.css';

export default function NotFound(){
    return (
        <>
            <section className="not-found" id='not-found'>
                <div className="container">
                    <h1 className="hero-title">
                        <div className="hero-title-top">
                            Page is <span className="green-block"> Not</span> 
                        </div>
                        <div className="hero-title-bottom">
                            <span className="hide">Ayo</span> Found.
                        </div>
                    </h1>
                    <p className="not-found-desc">Oops! The page you're looking for doesn't exist or has been moved.</p>
                    <div className="not-found-btn-container">
                        <Link href="/" className="btn btn-fill"><i className="fa-solid fa-chevron-left"></i> Go Back Home</Link>
                    </div>
                </div>
            </section>
        </>
    );
}

NotFound.layout = page => <Layout children={page}/>