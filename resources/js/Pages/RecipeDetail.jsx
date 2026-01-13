import Layout from "../Layouts/Layout";
import "../../css/RecipeDetail.css";
import { useState, useEffect } from "react";

export default function RecipeDetail({ recipe, user }) {
    const [liked, setLiked] = useState(true);
    const [yt, setYt] = useState({
        loading: true,
        embedUrl: null,
        error: null,
    });

    useEffect(() => {
        let cancelled = false;

        async function loadYoutube() {
            try {
                setYt({ loading: true, embedUrl: null, error: null });

                // You can tweak the query to improve results
                const query = `how to make ${recipe.title} recipe`;

                const res = await fetch(
                    `/youtube/search?q=${encodeURIComponent(query)}`
                );
                const data = await res.json();

                if (cancelled) return;

                if (!res.ok) {
                    setYt({
                        loading: false,
                        embedUrl: null,
                        error: data?.error || "Failed to load video",
                    });
                    return;
                }

                setYt({ loading: false, embedUrl: data.embedUrl, error: null });
            } catch (e) {
                if (!cancelled)
                    setYt({
                        loading: false,
                        embedUrl: null,
                        error: "Failed to load video",
                    });
            }
        }

        loadYoutube();
        return () => {
            cancelled = true;
        };
    }, [recipe.title]);

    return (
        <div className="recipe-detail-page container">
            <div className="recipe-detail-header">
                <div className="logo-stamp">
                    <img
                        src="/assets/logo/logo-stamp-transparent.png"
                        alt="Logo Stamp"
                    />
                </div>
                <div className="recipe-detail-image">
                    <img src={recipe.public_image} alt={recipe.title} />

                    <button
                        className="btn btn-rounded recipe-detail-like-button"
                        type="button"
                        aria-label="Like recipe"
                    >
                        {liked ? (
                            <i className="fa-solid fa-heart" />
                        ) : (
                            <i className="fa-regular fa-heart" />
                        )}
                        {liked ? "You liked this" : "Like this recipe"}
                    </button>
                </div>

                <div className="recipe-detail-content-box">
                    <h1 className="recipe-detail-title">{recipe.title}</h1>
                    <p>
                        {recipe.dietary_preferences.length > 0 &&
                            recipe.dietary_preferences
                                .map((d) => d.diet_name)
                                .join(", ")}

                        {recipe.dietary_preferences.length > 0 &&
                            recipe.allergies.length > 0 && (
                                <span className="color-primary ml-05 mr-05">
                                    •
                                </span>
                            )}

                        {recipe.allergies.length > 0 &&
                            "Warning contains: " +
                                recipe.allergies
                                    .map((a) => a.allergy_name)
                                    .join(", ")}
                    </p>

                    <div className="recipe-detail-infos">
                        <div className="recipe-detail-info">
                            <div className="recipe-detail-info-icon">
                                <i className="fa-solid fa-heart" />
                            </div>
                            <div className="recipe-detail-info-text">
                                <p className="recipe-detail-info-label">
                                    Favorites
                                </p>
                                <p className="recipe-detail-info-value">
                                    {recipe.likes_count}
                                </p>
                            </div>
                        </div>
                        <div className="recipe-detail-info">
                            <div className="recipe-detail-info-icon">
                                <i className="fa-regular fa-clock"></i>
                            </div>
                            <div className="recipe-detail-info-text">
                                <p className="recipe-detail-info-label">
                                    Cooking Time
                                </p>
                                <p className="recipe-detail-info-value">
                                    {recipe.cooking_time} mins
                                </p>
                            </div>
                        </div>
                        <div className="recipe-detail-info">
                            <div className="recipe-detail-info-icon">
                                <i className="fa-solid fa-leaf"></i>
                            </div>
                            <div className="recipe-detail-info-text">
                                <p className="recipe-detail-info-label">
                                    Total Ingredients
                                </p>
                                <p className="recipe-detail-info-value">
                                    {recipe.total_ingredient}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="recipe-detail-nutrients recipe-detail-section">
                <h3>Food Nutrients (Makro)</h3>

                <div className="recipe-detail-nutrient-cards">
                    <div className="recipe-detail-nutrient-card">
                        <div className="recipe-detail-nutrient-icon">
                            <i className="fa-solid fa-fire-flame-curved"></i>
                        </div>
                        <h4>Calories</h4>
                        <p>{recipe.calories} kcal</p>
                    </div>
                    <div className="recipe-detail-nutrient-card">
                        <div className="recipe-detail-nutrient-icon">
                            <i className="fa-solid fa-drumstick-bite" />
                        </div>
                        <h4>Protein</h4>
                        <p>{recipe.protein} gr</p>
                    </div>
                    <div className="recipe-detail-nutrient-card">
                        <div className="recipe-detail-nutrient-icon">
                            <i className="fa-solid fa-cookie"></i>
                        </div>
                        <h4>Fat</h4>
                        <p>{recipe.fat} gr</p>
                    </div>
                    <div className="recipe-detail-nutrient-card">
                        <div className="recipe-detail-nutrient-icon">
                            <i className="fa-solid fa-water"></i>
                        </div>
                        <h4>Sodium</h4>
                        <p>{recipe.sodium} mg</p>
                    </div>
                </div>
            </div>

            <div className="recipe-detail-ingr-inst">
                <div className="recipe-detail-ingredients recipe-detail-section">
                    <h3>Measured Ingredients</h3>
                    <p>{recipe.measured_ingredients}</p>
                </div>

                <div className="recipe-detail-instructions recipe-detail-section">
                    <h3>Instructions</h3>
                    {recipe.instructions.split(".").map(
                        (r, index) =>
                            r.trim() && (
                                <div className="mb-1" key={index}>
                                    <p className="color-primary medium">
                                        Step {index + 1}
                                    </p>
                                    <p>{r.trim() + "."}</p>
                                </div>
                            )
                    )}
                    <div className="recipe-detail-youtube">
                        <h3>Video Tutorial</h3>
                        <div className="recipe-detail-youtube-video">
                            {yt.loading && <p>Loading video...</p>}

                            {!yt.loading && yt.error && (
                                <p className="error-text">{yt.error}</p>
                            )}

                            {!yt.loading && !yt.error && yt.embedUrl && (
                                <iframe
                                    width="100%"
                                    height="500"
                                    src={yt.embedUrl}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            )}

                            {!yt.loading && !yt.error && !yt.embedUrl && (
                                <p>No video found for this recipe.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

RecipeDetail.layout = (page) => <Layout children={page} />;
