import { useState, useEffect } from 'react';
import styles from '../styles/ProfileEditModal.module.css';

export default function ProfileEditModal({ isOpen, onClose, userData, onUpdate }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    coach_name: '',
    team_name: '',
    team_role: '',
    phone: '',
    age: '',
    school: '',
    address: '',
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (userData) {
      setFormData({
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        email: userData.email || '',
        coach_name: userData.coach_name || '',
        team_name: userData.team_name || '',
        team_role: userData.team_role || '',
        phone: userData.phone || '',
        age: userData.age || '',
        school: userData.school || '',
        address: userData.address || '',
      });
      setProfilePicturePreview(userData.profile_picture_url || null);
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Profile picture must be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      setProfilePicture(file);
      setProfilePicturePreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Update profile data first
      const response = await fetch('http://127.0.0.1:8000/api/profiles/update-profile/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      // Upload profile picture if selected
      if (profilePicture) {
        const formDataPic = new FormData();
        formDataPic.append('profile_picture', profilePicture);

        const pictureResponse = await fetch('http://127.0.0.1:8000/api/profiles/upload-picture/', {
          method: 'POST',
          headers: {
            'Authorization': `Token ${token}`
          },
          body: formDataPic
        });

        if (pictureResponse.ok) {
          const pictureData = await pictureResponse.json();
          data.profile.profile_picture_url = pictureData.profile_picture_url;
        }
      }

      setSuccess('Profile updated successfully!');
      setTimeout(() => {
        onUpdate(data.profile); // Update parent component
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
      console.error('Profile update error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>✏️ Edit Profile</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}
        {success && <div className={styles.successMessage}>{success}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Profile Picture Upload */}
          <div className={styles.profilePictureSection}>
            <div className={styles.profilePicturePreview}>
              {profilePicturePreview ? (
                <img src={profilePicturePreview} alt="Profile" className={styles.previewImage} />
              ) : (
                <div className={styles.placeholderImage}>
                  <span>📷</span>
                  <p>No picture</p>
                </div>
              )}
            </div>
            <div className={styles.uploadButton}>
              <label htmlFor="profilePictureInput" className={styles.uploadLabel}>
                📸 {profilePicturePreview ? 'Change' : 'Upload'} Profile Picture
              </label>
              <input
                type="file"
                id="profilePictureInput"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <p className={styles.uploadHint}>Max 5MB • JPG, PNG, GIF</p>
            </div>
          </div>

          <div className={styles.formGrid}>
            {/* Personal Information */}
            <div className={styles.formSection}>
              <h3>Personal Information</h3>
              
              <div className={styles.formGroup}>
                <label htmlFor="first_name">First Name *</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your first name"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="last_name">Last Name</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 1234567890"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="1"
                  max="150"
                  placeholder="Enter your age"
                />
              </div>
            </div>

            {/* Team Information */}
            <div className={styles.formSection}>
              <h3>Team Information</h3>
              
              <div className={styles.formGroup}>
                <label htmlFor="coach_name">Coach Name *</label>
                <input
                  type="text"
                  id="coach_name"
                  name="coach_name"
                  value={formData.coach_name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your coach's name"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="team_name">Team Name *</label>
                <input
                  type="text"
                  id="team_name"
                  name="team_name"
                  value={formData.team_name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your team name"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="team_role">Team Role *</label>
                <select
                  id="team_role"
                  name="team_role"
                  value={formData.team_role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your role</option>
                  <option value="Handler">Handler</option>
                  <option value="Cutter">Cutter</option>
                  <option value="Defense">Defense</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Captain">Captain</option>
                  <option value="Vice Captain">Vice Captain</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="school">School</label>
                <input
                  type="text"
                  id="school"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  placeholder="Enter your school name"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter your address"
                />
              </div>
            </div>
          </div>

          <div className={styles.formActions}>
            <button 
              type="button" 
              className={styles.cancelButton} 
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
