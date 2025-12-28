import { usePage } from '@inertiajs/react'
import Layout from '../Layouts/Layout'
import { Link } from '@inertiajs/react';

import '../../css/Profile.css';

export default function Profile({user}){
    function getPronouns(gender){
        if(gender === 'male') return 'he/him'
        return 'she/her'
    }

    console.log(user);

    return (
        <section className="profile" id="profile">
            <div className="container">
                <div className="profile-left">
                    <div className="profile-image">
                        <img
                            src={user.profile_image
                                ? user.profile_image
                                : './assets/sample-images/default-profile.png'}
                            alt={`profile-${user.username}`}
                        />
                    </div>
                    <h2 className="profile-fullname">{user.full_name}</h2>
                    <h3 className="profile-username">
                        {user.username}
                        {user.gender != 'silent' ? ' - ' + getPronouns(user.gender) : ''}
                    </h3>
                    {user.bio && <p className="profile-bio">{user.bio.trim()}</p> }
                    <div className="profile-bio">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, sit!</div>
                    <button type="button" className="btn-full btn btn-line" href="#hubungi">
                        Edit Profile
                    </button>
                    
                    <ul className="profile-other-infos">
                        <h4>Other Info</h4>

                        <li className="profile-other-info">
                            <i class="fa-regular fa-envelope"></i>
                            <p>{user.email}</p>
                        </li>

                        {
                            user.phone &&
                            <li className="profile-other-info">
                                <i class="fa-solid fa-phone"></i>
                                <p>{user.phone}</p>
                            </li>
                        }

                        {
                            user.birth_date &&
                            <li className="profile-other-info">
                                <i class="fa-regular fa-calendar"></i>
                                <p>{user.birth_date}</p>
                            </li>
                        }
                    </ul>

                    {
                        user.allergies.length > 0 &&
                        <div className="profile-list">
                            <h4>Allergies</h4>
                            <div className="profile-list-items">
                                {
                                    user.allergies.map((allergy) => (
                                        <span key={allergy.allergy_id} className="profile-list-item">
                                            {allergy.allergy_name}
                                        </span>
                                    ))
                                }
                            </div>
                        </div>
                    }

                    {
                        user.dietary_preferences.length > 0 &&
                        <div className="profile-list">
                            <h4>Dietary Preferences</h4>
                            <div className="profile-list-items">
                                {
                                    user.dietary_preferences.map((dietary_preference) => (
                                        <span key={dietary_preference.dietary_preference_id} className="profile-list-item">
                                            {dietary_preference.diet_name}
                                        </span>
                                    ))
                                }
                            </div>
                        </div>
                    }

                </div>

                {/* recipes that is liked */}
                <div className="profile-right">
                    <h2>Liked Recipes</h2>

                    {
                        user.liked_recipes.length > 0 &&
                        <p className='mb-05'>Liked {user.liked_recipes.length} recipes</p>
                    }

                    <div className="profile-liked-recipes-container recipes-container">
                        {
                            user.liked_recipes.length > 0 ? (
                                user.liked_recipes.map((recipe) => (
                                    <div key={recipe.id} className="recipe-card">
                                        <div className="recipe-image">
                                            <img
                                                src={`./assets/food-images/${recipe.image}.jpg`}
                                                alt={recipe.image}
                                                className="profile-liked-recipe-image"
                                            />
                                            {/* <span className="recipe-tags">
                                                <i class="fa-solid fa-crown"></i>
                                                <p>
                                                    Premium
                                                </p>
                                            </span> */}
                                            {/* <span className="recipe-tags">
                                                <i class="fa-solid fa-heart"></i>
                                                <p>
                                                    Favs
                                                </p>
                                            </span> */}
                                        </div>
                                        <div className="recipe-content">
                                            <h3 className="profile-liked-recipe-title">{recipe.title}</h3>
                                            <div className="recipe-info">
                                                <div className="recipe-rating recipe-info-list">
                                                    <i className="fa-solid fa-star"></i>
                                                    <p>{(Math.round(recipe.rating * 10) / 10).toFixed(1)}</p>
                                                </div>
                                                <div className="recipe-cooking-time recipe-info-list">
                                                    <i className="fa-regular fa-clock"></i>
                                                    <p>{recipe.cooking_time} mins</p>
                                                </div>
                                                <div className="recipe-ingredients-count recipe-info-list">
                                                    <i className="fa-solid fa-leaf"></i>
                                                    <p>{recipe.total_ingredient} ingredients</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <>
                                    <p>You haven't liked any recipes yet. Explore and like your favorite recipes!</p>
                                    <Link className="btn btn-fill btn-sm mt-05" href="/recipes">Explore Recipes</Link>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

Profile.layout = page => <Layout children={page} />