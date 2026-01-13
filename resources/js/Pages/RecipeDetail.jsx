import Layout from "../Layouts/Layout";
import "../../css/RecipeDetail.css";
import { useState } from "react";

export default function RecipeDetail({ recipe, user }) {
    const [liked, setLiked] = useState(true);
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
                                <i class="fa-regular fa-clock"></i>
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
                            <i class="fa-solid fa-fire-flame-curved"></i>
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
                            <i class="fa-solid fa-water"></i>
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
                    {recipe.instructions.split('.').map((r, index) => (
                        r.trim() &&
                        <div className="mb-1" key={r}>
                            <p className="color-primary medium">Step {index + 1}</p>
                            <p key={r}>{ r.trim() + '.'}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

RecipeDetail.layout = (page) => <Layout children={page} />;
