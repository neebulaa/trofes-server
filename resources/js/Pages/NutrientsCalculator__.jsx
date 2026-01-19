import Layout from "../Layouts/Layout";
import { useMemo, useState } from "react";
import "../../css/NutrientsCalculator.css";
import { Link, useForm, usePage } from "@inertiajs/react";
import RecipeCard from "../Components/RecipeCard";

export default function NutrientsCalculator({ recommended_recipes }) {
    const { data, setData, post, processing, errors } = useForm({
        activity_level: "MIDDLE",
        gender: "male",
        age: "",
        weight: "",
        height: "",
        // add:
        goal: "MAINTAIN", // LOSE | MAINTAIN | GAIN | MUSCLE
        // optional: if your backend expects these, keep them in form data too:
        calories: null,
        carbs_g: null,
        protein_g: null,
        fat_g: null,
    });

    const { props } = usePage();
    const {
        auth: { user },
    } = props;

    const [calculated, setCalculated] = useState(false);

    const activityLevels = [
        { id: "low", label: "Low", value: "LOW", description: "Mostly sedentary lifestyle..." },
        { id: "middle", label: "Middle", value: "MIDDLE", description: "Moderately active lifestyle..." },
        { id: "high", label: "High", value: "HIGH", description: "Active lifestyle..." },
        { id: "very-high", label: "Very High", value: "VERY HIGH", description: "Very active lifestyle..." },
    ];

    const activityMultiplierByLevel = {
        LOW: 1.2,
        MIDDLE: 1.55,
        HIGH: 1.725,
        "VERY HIGH": 1.9,
    };

    const macroRatioByGoal = {
        LOSE: { carbs: 0.4, protein: 0.3, fat: 0.3 },
        MAINTAIN: { carbs: 0.5, protein: 0.25, fat: 0.25 },
        GAIN: { carbs: 0.5, protein: 0.2, fat: 0.3 },
        MUSCLE: { carbs: 0.4, protein: 0.3, fat: 0.3 },
    };

    function clampNumber(value, min, max) {
        const n = Number(value);
        if (!Number.isFinite(n)) return null;
        return Math.min(max, Math.max(min, n));
    }

    function calcBmr({ gender, age, weightKg, heightCm }) {
        // Mifflin–St Jeor
        const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
        return gender === "female" ? base - 161 : base + 5;
    }

    function calcTargets() {
        const age = clampNumber(data.age, 1, 120);
        const weightKg = clampNumber(data.weight, 1, 500);
        const heightCm = clampNumber(data.height, 30, 300);

        if (age === null || weightKg === null || heightCm === null) return null;

        const bmr = calcBmr({ gender: data.gender, age, weightKg, heightCm });
        const multiplier = activityMultiplierByLevel[data.activity_level] ?? 1.55;
        const tdee = bmr * multiplier;

        // goal adjustments (typical, tweak as you like)
        const goalAdjustByGoal = {
            LOSE: -0.2,     // -20%
            MAINTAIN: 0,
            GAIN: 0.15,     // +15%
            MUSCLE: 0.1,    // +10%
        };

        const adjustedCalories = tdee * (1 + (goalAdjustByGoal[data.goal] ?? 0));
        const calories = Math.round(adjustedCalories);

        const ratios = macroRatioByGoal[data.goal] ?? macroRatioByGoal.MAINTAIN;

        const carbsKcal = calories * ratios.carbs;
        const proteinKcal = calories * ratios.protein;
        const fatKcal = calories * ratios.fat;

        const carbs_g = Math.round(carbsKcal / 4);
        const protein_g = Math.round(proteinKcal / 4);
        const fat_g = Math.round(fatKcal / 9);

        return {
            calories,
            carbs_g,
            protein_g,
            fat_g,
            carbs_pct: ratios.carbs,
            protein_pct: ratios.protein,
            fat_pct: ratios.fat,
        };
    }

    const targets = useMemo(() => calcTargets(), [data.gender, data.age, data.weight, data.height, data.activity_level, data.goal]);

    function handleSubmit(e) {
        e.preventDefault();

        const t = calcTargets();
        if (!t) {
            // you can set your own UI error handling here
            return;
        }

        // If you want the backend to receive the computed numbers:
        setData((prev) => ({
            ...prev,
            calories: t.calories,
            carbs_g: t.carbs_g,
            protein_g: t.protein_g,
            fat_g: t.fat_g,
        }));

        // IMPORTANT: setData is async-ish; if backend must receive computed values reliably,
        // prefer post(route, { data: { ...data, ...computed } }) pattern, depending on your Inertia version.
        post();

        setCalculated(true);
    }

    function resetForm() {
        setCalculated(false);
        // If you want a true reset:
        setData({
            activity_level: "MIDDLE",
            gender: "male",
            age: "",
            weight: "",
            height: "",
            goal: "MAINTAIN",
            calories: null,
            carbs_g: null,
            protein_g: null,
            fat_g: null,
        });
    }

    return (
        <>
            {/* ... left side unchanged ... */}

            <div className="nutrients-calculator-right">
                <div className="container">
                    <h2 className="subsection-title">Your Result</h2>

                    <div className="calculator-result">
                        <div className="calculator-result-calories">
                            <h2>{targets ? `${targets.calories} kcal` : "-- kcal"}</h2>
                            <p>
                                Suggested amount of calories <b>per day</b>.
                            </p>
                        </div>

                        <div className="calculator-result-list">
                            <div className="calculator-result-list-item">
                                <h4>Carbohydrate</h4>
                                <p>
                                    <span>{targets ? `${targets.carbs_g} g` : "-- g"}</span>{" "}
                                    /{targets ? `${(targets.carbs_pct * 100).toFixed(0)}%` : "--%"}
                                </p>
                            </div>
                            <div className="calculator-result-list-item">
                                <h4>Protein</h4>
                                <p>
                                    <span>{targets ? `${targets.protein_g} g` : "-- g"}</span>{" "}
                                    /{targets ? `${(targets.protein_pct * 100).toFixed(0)}%` : "--%"}
                                </p>
                            </div>
                            <div className="calculator-result-list-item">
                                <h4>Fat</h4>
                                <p>
                                    <span>{targets ? `${targets.fat_g} g` : "-- g"}</span>{" "}
                                    /{targets ? `${(targets.fat_pct * 100).toFixed(0)}%` : "--%"}
                                </p>
                            </div>

                            {/* sodium: you currently don’t have inputs to calculate it.
                                Either remove it, hardcode a guideline, or compute based on a rule. */}
                        </div>
                    </div>

                    <div className="calculator-goals">
                        <h2 className="subsection-title">Adjust according to your goals</h2>
                        <div className="calculator-goals-buttons">
                            <button
                                type="button"
                                className={data.goal === "LOSE" ? "selected" : ""}
                                onClick={() => setData("goal", "LOSE")}
                            >
                                Lose Weight
                            </button>
                            <button
                                type="button"
                                className={data.goal === "MAINTAIN" ? "selected" : ""}
                                onClick={() => setData("goal", "MAINTAIN")}
                            >
                                Maintain Weight
                            </button>
                            <button
                                type="button"
                                className={data.goal === "GAIN" ? "selected" : ""}
                                onClick={() => setData("goal", "GAIN")}
                            >
                                Gain Weight
                            </button>
                            <button
                                type="button"
                                className={data.goal === "MUSCLE" ? "selected" : ""}
                                onClick={() => setData("goal", "MUSCLE")}
                            >
                                Gain Muscle
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

NutrientsCalculator.layout = (page) => <Layout children={page} />;