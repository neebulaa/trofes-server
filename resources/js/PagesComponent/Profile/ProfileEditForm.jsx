import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import CustomDatalist from '../../Components/CustomDatalist';
export default function ProfileEditForm({user, handleEditProfile, allergies, dietary_preferences}) {
    const { data, setData, post, processing, errors } = useForm({
        full_name: user.full_name || '',
        username: user.username || '',
        gender: user.gender || '',
        bio: user.bio || '',
        email: user.email || '',
        phone: user.phone || '',
        birth_date: user.birth_date || '',
    });

    const [selectedAllergy, setSelectedAllergy] = useState(user.allergies);

    function addSelectedAllergy(option) {
        setSelectedAllergy(prev => [...prev, option]);
    }

    return (
        <>
        <form action="">
            <div className="profile-image">
                <img
                    src={user.profile_image
                        ? user.profile_image
                        : './assets/sample-images/default-profile.png'}
                        alt={`profile-${user.username}`}
                        />
                <div className="profile-image-edit-badge">
                    <i className="fa-solid fa-pen"></i>
                    <p>
                        Edit
                    </p>
                </div>
            </div>
            <div className="input-group input-sm">
                <label htmlFor="full_name">Full Name</label>
                <input
                    type="text"
                    id="full_name"
                    value={data.full_name}
                    onChange={(e) => setData('full_name', e.target.value)}
                    placeholder="Your name here"
                />
                {errors.full_name && (
                    <small className="error-text">{errors.full_name}</small>
                )}
            </div>

            <div className="input-group input-sm">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={data.username}
                    onChange={(e) => setData('username', e.target.value)}
                    placeholder="Your username here"
                />
                {errors.username && (
                    <small className="error-text">{errors.username}</small>
                )}
            </div>

            <div className="input-group input-sm">
                <label htmlFor="gender">Jenis Kelamin</label>
                <select
                    id="gender"
                    value={data.gender}
                    onChange={(e) => setData('gender', e.target.value)}
                >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="silent">Prefer not to say</option>
                </select>
                {errors.gender && (
                    <small className="error-text">{errors.gender}</small>
                )}
            </div>

            <div className="input-group input-sm">
                <label htmlFor="bio">Bio</label>
                <textarea name="bio" id="bio" value={data.bio} onChange={(e) => setData('bio', e.target.value)} placeholder="Your bio here"></textarea>
                {errors.bio && (
                    <small className="error-text">{errors.bio}</small>
                )}
            </div>
            
            <div className="input-group input-sm">
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="Your email here"
                    disabled={true}
                    readOnly={true}
                />
                {errors.email && (
                    <small className="error-text">{errors.email}</small>
                )}
            </div>

            <div className="input-group input-sm">
                <label htmlFor="phone">Phone Number</label>
                <div className="nohp-input">
                    <div className="phone-identifier">+62</div>
                    <input
                        type="tel"
                        id="phone"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        placeholder="81234567890"
                    />
                </div>
                {errors.phone && (
                    <small className="error-text">{errors.phone}</small>
                )}
            </div>

            <div className="input-group input-sm">
                <label htmlFor="birth_date">Date of Birth</label>
                <input
                    type="date"
                    id="birth_date"
                    value={data.birth_date}
                    onChange={(e) =>
                        setData('birth_date', e.target.value)
                    }
                />
                {errors.birth_date && (
                    <small className="error-text">
                        {errors.birth_date}
                    </small>
                )}
            </div>

            <CustomDatalist
                label="Select Allergies"
                options={allergies.map(a => ({
                    value: a.allergy_id,
                    label: a.allergy_name
                }))}
                value={selectedAllergy}
                onChange={(option) => addSelectedAllergy(option)}
                placeholder="Type allergy..."
            />

            <div className="edit-profile-btns">
                <button 
                    type="submit"
                    className="btn-full btn btn-fill btn-sm"
                    disabled={processing}
                >
                    Save
                </button>
                <button type="button" className="btn-sm btn-full btn btn-line mr-05" onClick={handleEditProfile}>
                    Cancel
                </button>
            </div>
        </form>
        </>
    );
}