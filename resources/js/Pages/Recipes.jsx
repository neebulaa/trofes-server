import Layout from "../Layouts/Layout";
import "../../css/Recipes.css";
import { useForm } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

const cardsData = [
  { id: 1, img: "/assets/sample-images/nasi hainan.jpg", label: "Nasi Hainan Tiongkok" },
  { id: 2, img: "/assets/sample-images/sate ayam.jpg", label: "Sate Ayam" },
  { id: 3, img: "/assets/sample-images/nasi lemak.jpg", label: "Nasi Lemak Malaysia" },
  { id: 4, img: "/assets/sample-images/ramen sapi.jpg", label: "Beef Ramen" },
  { id: 5, img: "/assets/sample-images/chicken masala.jpg", label: "Chicken Masala" },
];

export default function Recipes() {
    const { data, setData, errors } = useForm({ search: "" });

    const [activeIndex, setActiveIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const timersRef = useRef({ intervalId: null, timeoutId: null });

    const SHOW_MS = 5000;
    const FADE_MS = 450;  // samain dgn CSS transition duration

    useEffect(() => {
        const firstIn = setTimeout(() => setIsVisible(true), 0);

        timersRef.current.intervalId = setInterval(() => {
            setIsVisible(false);

            timersRef.current.timeoutId = setTimeout(() => {
                setActiveIndex((prev) => (prev + 1) % cardsData.length);
                requestAnimationFrame(() => setIsVisible(true));
            }, FADE_MS);
        }, SHOW_MS);

        return () => {
            clearTimeout(firstIn);
            clearInterval(timersRef.current.intervalId);
            clearTimeout(timersRef.current.timeoutId);
        };
    }, []);

    const card = cardsData[activeIndex];

    return (
        <section id="recipes-page" className="recipes-page">
        <div className="container">
            <div className="recipes-page-hero">
                <div className="recipes-page-hero-left">
                    <h1 className="recipes-page-hero-title">
                        Discover the Best Food <span className="green-block">Recipes</span> in the World
                    </h1>
                    <p className="recipes-page-hero-desc">
                        Discover the Best Food Recipes in the World helps users find a variety of selected dishes from different countries.
                    </p>

                    <form action="" className="mt-1">
                        <div className="input-group">
                            <div className="search-input">
                                <span>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </span>

                                <input
                                    type="text"
                                    value={data.search}
                                    onChange={(e) => setData("search", e.target.value)}
                                    placeholder="Search guides..."
                                />

                                <button type="submit" className="search-btn">
                                    Search
                                </button>
                            </div>

                            {errors.search && <small className="error-text">{errors.search}</small>}
                        </div>
                    </form>
                </div>
        
                <div className="recipes-page-hero-right">
                    <div className="recipe-show">
                        {/* key changes when recipe changes */}
                        <div className={`recipe-show-card ${isVisible ? "in" : "out"}`} key={card.id}>
                            <img src={card.img} alt={card.label} />
                            <p className="recipe-card-badge for-name">{card.label}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
    );
}

Recipes.layout = (page) => <Layout children={page} />;
