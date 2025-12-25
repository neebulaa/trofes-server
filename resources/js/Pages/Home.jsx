import Layout from "../Layouts/Layout";
import Hero from "../PagesComponent/Home/Hero";
import About from "../PagesComponent/Home/About";
import Guides from "../PagesComponent/Home/Guides";
import '../../css/Home.css'

export default function Home(){
    return (
        <>
            <Hero />
            <About />
            <Guides />
        </>
    );
}

Home.layout = page => <Layout children={page}/>