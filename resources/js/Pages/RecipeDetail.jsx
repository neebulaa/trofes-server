import Layout from "../Layouts/Layout";
import "../../css/RecipeDetail.css";
import { useState, useEffect } from "react";
import FlashMessage from "../Components/FlashMessage";

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

                // just tweak the query to improve results
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

    function splitIngredientsSmart(text) {
        if (!text) return [];
        const s = text.replace(/\s+/g, " ").trim();

        // without a qty number start
        const noQtyStarts = [
            "freshly",
            "ground",
            "salt",
            "pepper",
            "kosher",
            "black",
            "white",
            "olive oil",
            "oil",
            "butter",
        ];

        const parts = s.split(
            new RegExp(
                String.raw`,\s+(?=(?:\d+\s+\d+\/\d+|\d+\/\d+|\d+|a|an)\b|(?:${noQtyStarts
                    .map((x) => x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
                    .join("|")})\b)`,
                "i"
            )
        );

        return parts.map((p) => p.trim()).filter(Boolean);
    }

    function splitAfterParen(step) {
        // split when we have: ") " followed by a capital letter (new sentence)
        // example: "(... occasionally.) Transfer lamb..." -> split at ") "
        const parts = step.split(/\)\s+(?=[A-Z0-9])/g);

        if (parts.length <= 1) return [step];

        // Put the ')' back except the last part
        return parts.map((p, i) =>
            i < parts.length - 1 ? p.trim() + ")" : p.trim()
        );
    }

    function splitInstructionsSmart(text) {
        if (!text) return [];

        let s = String(text)
            .replace(/\r\n/g, "\n")
            .replace(/\u00A0/g, " ")
            .replace(/[ \t]+/g, " ")
            .replace(/\n+/g, " ")
            .trim();

        // protect decimals: 1.5
        s = s.replace(/(\d)\.(\d)/g, "$1<dot>$2");

        // protect punctuation inside parentheses
        s = s.replace(/\(([^)]*)\)/g, (full, inner) => {
            const safe = inner
                .replace(/\./g, "<p>")
                .replace(/\!/g, "<e>")
                .replace(/\?/g, "<q>");
            return `(${safe})`;
        });

        let parts = s.split(/(?<=[.!?])\s+(?=[A-Z0-9(])/g);

        // restore placeholders
        parts = parts.map((x) =>
            x
                .replace(/<dot>/g, ".")
                .replace(/<p>/g, ".")
                .replace(/<e>/g, "!")
                .replace(/<q>/g, "?")
                .trim()
        );

        // merge parenthetical-only sentences into previous
        const merged = [];
        for (const p of parts) {
            if (!p) continue;
            if (p.startsWith("(") && merged.length) {
                merged[merged.length - 1] = `${
                    merged[merged.length - 1]
                } ${p}`.trim();
            } else {
                merged.push(p);
            }
        }

        // split any step that has ") <NewSentence>"
        const finalSteps = merged.flatMap(splitAfterParen);

        return finalSteps.filter(Boolean);
    }

    return (
        <>
            <FlashMessage className="flash-screen" />
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
                        <p className="mt-05">
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
                        <ul>
                            {splitIngredientsSmart(
                                recipe.measured_ingredients
                            ).map((ingr, index) => (
                                <li key={index}>{ingr}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="recipe-detail-instructions recipe-detail-section">
                        <h3>Instructions</h3>
                        {splitInstructionsSmart(recipe.instructions).map(
                            (step, index) => (
                                <div className="mb-1" key={index}>
                                    <p className="color-primary medium">
                                        Step {index + 1}
                                    </p>
                                    <p>{step}</p>
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
        </>
    );
}

RecipeDetail.layout = (page) => <Layout children={page} />;
