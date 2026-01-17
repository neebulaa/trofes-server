import Layout from "../Layouts/Layout";
import { useState } from "react";
import "../../css/NutrientsCalculator.css";
import { Link, useForm, usePage } from "@inertiajs/react";
import RecipeCard from "../Components/RecipeCard";

export default function NutrientsCalculator({ recommended_recipes }) {
    const { url, props } = usePage();
    const {
        auth: { user },
    } = props;

    const [activityLevel, setActivityLevel] = useState("MIDDLE");
    const [calculated, setCalculated] = useState(false);

    const activityLevels = [
        {
            id: "low",
            label: "Low",
            value: "LOW",
            description:
                "Mostly sedentary lifestyle with little to no physical activity (e.g., desk or office job).",
        },
        {
            id: "middle",
            label: "Middle",
            value: "MIDDLE",
            description:
                "Moderately active lifestyle with regular exercise 3-5 days per week or light physical work.",
        },
        {
            id: "high",
            label: "High",
            value: "HIGH",
            description:
                "Active lifestyle with intense exercise or training 6-7 days per week.",
        },
        {
            id: "very-high",
            label: "Very High",
            value: "VERY HIGH",
            description:
                "Very active lifestyle involving daily intense exercise or a physically demanding job (e.g., athletes or manual labor).",
        },
    ];

    function handleSubmit(e) {
        e.preventDefault();
        setCalculated(!calculated);
    }

    function resetForm() {}

    return (
        <>
            <section
                className={
                    "nutrients-calculator" + (calculated ? " calculated" : "")
                }
                id="nutrients-calculator"
            >
                <div className="nutrients-calculator-left">
                    <div className="container">
                        <img
                            src="./assets/graphics/crown.png"
                            alt="crown graphics"
                            className="nutrients-title-graphic"
                        />
                        <h1 className="nutrients-title">
                            <span className="green-block">Nutrients</span>{" "}
                            <br />
                            Calculator
                        </h1>
                        <p className="nutrients-description">
                            Calculate optimal macronutrients ratios for your
                            body with our easy-to-use calculator.
                        </p>
                    </div>
                </div>

                <div className="nutrients-main">
                    <div className="calculator">
                        <div className="container">
                            <form action="" onSubmit={handleSubmit}>
                                <div className="calculator-input">
                                    <h2 className="subsection-title">
                                        Body Parameter
                                    </h2>
                                    <p>
                                        Input your Gender, Age, Weight, Height
                                    </p>

                                    <div className="gender-inputs mt-1">
                                        <div className="gender-choice selected">
                                            <input
                                                type="radio"
                                                hidden
                                                id="male"
                                                name="gender"
                                                checked={true}
                                            />
                                            <label
                                                htmlFor="male"
                                                className="gender-selection"
                                            >
                                                Male
                                            </label>
                                        </div>
                                        <div className="gender-choice">
                                            <input
                                                type="radio"
                                                hidden
                                                id="female"
                                                name="gender"
                                            />
                                            <label
                                                htmlFor="female"
                                                className="gender-selection"
                                            >
                                                Female
                                            </label>
                                        </div>
                                    </div>

                                    <div className="body-parameters-inputs mt-1">
                                        <div className="body-parameter">
                                            <input
                                                min="1"
                                                max="120"
                                                id="age"
                                                type="number"
                                                placeholder="Age (years)"
                                                className="body-parameter-input"
                                            />
                                        </div>
                                        <div className="body-parameter input-group-identifier">
                                            <input
                                                min="1"
                                                max="500"
                                                id="weight"
                                                type="number"
                                                placeholder="Weight (kg)"
                                                className="body-parameter-input"
                                            />
                                            <span className="identifier">
                                                kg
                                            </span>
                                        </div>

                                        <div className="body-parameter input-group-identifier">
                                            <input
                                                min="30"
                                                max="300"
                                                id="height"
                                                type="number"
                                                placeholder="Height (cm)"
                                                className="body-parameter-input"
                                            />
                                            <span className="identifier">
                                                cm
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="calculator-input">
                                    <h2 className="subsection-title">
                                        Activity Level
                                    </h2>
                                    <p>
                                        <span style={{ fontWeight: "500" }}>
                                            {
                                                activityLevels.find(
                                                    (level) =>
                                                        level.value ===
                                                        activityLevel,
                                                )?.label
                                            }
                                        </span>
                                        :{" "}
                                        {
                                            activityLevels.find(
                                                (level) =>
                                                    level.value ===
                                                    activityLevel,
                                            )?.description
                                        }
                                    </p>

                                    <div className="activity-level-inputs">
                                        <div className="activity-level-track">
                                            <div
                                                className="activity-level-indicator"
                                                style={{
                                                    left: `${activityLevels.findIndex((level) => level.value === activityLevel) * (100 / (activityLevels.length - 1))}%`,
                                                }}
                                            >
                                                <div className="indicator-dot"></div>
                                            </div>
                                        </div>

                                        <div className="activity-level-labels">
                                            {activityLevels.map(
                                                (level, index) => (
                                                    <div
                                                        key={level.id}
                                                        className={`activity-level-label ${activityLevel === level.value ? "active" : ""}`}
                                                        onClick={() =>
                                                            setActivityLevel(
                                                                level.value,
                                                            )
                                                        }
                                                        style={{
                                                            left: `${index * (100 / (activityLevels.length - 1))}%`,
                                                        }}
                                                    >
                                                        <span>
                                                            {level.label}
                                                        </span>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>

                                    <div className="nutrients-calculator-buttons">
                                        <button
                                            className="btn btn-fill"
                                            type="reset"
                                        >
                                            Reset
                                        </button>
                                        <button
                                            className="btn btn-outline"
                                            type="submit"
                                        >
                                            Calculate
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="nutrients-calculator-right">
                        <div className="container">
                            <h2 className="subsection-title">Your Result</h2>
                            <div className="calculator-result">
                                <div className="calculator-result-calories">
                                    <h2>1890 kcal</h2>
                                    <p>
                                        Suggested amount of calories{" "}
                                        <b>per day</b>.
                                    </p>
                                </div>

                                <div className="calculator-result-list">
                                    <div className="calculator-result-list-item">
                                        <h4>Carbohydrate</h4>
                                        <p>
                                            <span>150 g</span> /45.8%
                                        </p>
                                    </div>
                                    <div className="calculator-result-list-item">
                                        <h4>Protein</h4>
                                        <p>
                                            <span>120 g</span> /45.8%
                                        </p>
                                    </div>
                                    <div className="calculator-result-list-item">
                                        <h4>Fat</h4>
                                        <p>
                                            <span>138 g</span> /45.8%
                                        </p>
                                    </div>
                                    <div className="calculator-result-list-item">
                                        <h4>Sodium</h4>
                                        <p>
                                            <span>590 mg</span> /45.8%
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="calculator-goals">
                                <h2 className="subsection-title">
                                    Adjust according to your goals
                                </h2>
                                <div className="calculator-goals-buttons">
                                    <button
                                        className="selected"
                                        onClick={resetForm}
                                    >
                                        Lose Weight
                                    </button>
                                    <button onClick={resetForm}>
                                        Maintain Weight
                                    </button>
                                    <button onClick={resetForm}>
                                        Gain Weight
                                    </button>
                                    <button onClick={resetForm}>
                                        Gain Muscle
                                    </button>
                                </div>
                            </div>

                            <div className="recommended-recipes">
                                <div className="subsection-split">
                                    <h2 className="subsection-title">
                                        Recommended Recipes
                                    </h2>
                                    <Link
                                        href="/recipes"
                                        className="color-primary medium"
                                    >
                                        See All
                                    </Link>
                                </div>
                                <div className="recommended-recipes-list">
                                    <div className="recommended-recipes-list-wrapper">
                                        <div className="recipes-container">
                                            {recommended_recipes.map(
                                                (recipe) => (
                                                    <RecipeCard
                                                        key={recipe.id}
                                                        recipe={recipe}
                                                    />
                                                ),
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

NutrientsCalculator.layout = (page) => <Layout children={page} />;
