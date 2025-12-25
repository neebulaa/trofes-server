import '../../css/Navbar.css'
import '../../css/Footer.css'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

import {Head} from '@inertiajs/react';


export default function Layout({children}){
    return (
        <>
            <Head>
                <title>Trofes</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            </Head>
            <Navbar />

            {children}

            <Footer />
        </>
    )
}