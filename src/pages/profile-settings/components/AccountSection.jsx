import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import profileImg from "../../../../images/profileImg.jpg";

const AccountSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Osama Alsaid",
    email: "CareVis.is.the.future@email.com",
    age: "23",
    activityLevel: "moderate",
    primaryGoal: "stress-relief",
    avatar: profileImg,
avatarAlt: "Profile image",

  });

  const activityLevelOptions = [
  { value: 'low', label: 'Low Activity', description: 'Mostly sedentary lifestyle' },
  { value: 'moderate', label: 'Moderate Activity', description: 'Regular light exercise' },
  { value: 'high', label: 'High Activity', description: 'Frequent intense workouts' }];


  const goalOptions = [
  { value: 'stress-relief', label: 'Stress Relief', description: 'Focus on relaxation techniques' },
  { value: 'posture-improvement', label: 'Posture Improvement', description: 'Better alignment and ergonomics' },
  { value: 'muscle-tension', label: 'Muscle Tension Relief', description: 'Target specific tension areas' },
  { value: 'overall-wellness', label: 'Overall Wellness', description: 'Comprehensive health approach' }];


  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save logic would go here
    console.log('Saving profile data:', profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-gentle border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="User" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Account Information</h2>
        </div>
        {!isEditing ?
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(true)}
          iconName="Edit2"
          iconPosition="left">

            Edit Profile
          </Button> :

        <div className="flex space-x-2">
            <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}>

              Cancel
            </Button>
            <Button
            variant="default"
            size="sm"
            onClick={handleSave}
            iconName="Check"
            iconPosition="left">

              Save
            </Button>
          </div>
        }
      </div>
      <div className="space-y-6">
        {/* Profile Picture */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={profileData?.avatar}
              alt={profileData?.avatarAlt}
              className="w-20 h-20 rounded-full object-cover border-4 border-primary/20" />

            {isEditing &&
            <Button
              variant="default"
              size="icon"
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full">

                <Icon name="Camera" size={16} />
              </Button>
            }
          </div>
          <div>
            <h3 className="text-lg font-medium text-foreground">{profileData?.name}</h3>
            <p className="text-sm text-muted-foreground">Member since November 2023</p>
            {isEditing &&
            <Button variant="ghost" size="sm" className="mt-1 text-primary">
                Change Photo
              </Button>
            }
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            type="text"
            value={profileData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            disabled={!isEditing}
            className="bg-background" />

          <Input
            label="Email Address"
            type="email"
            value={profileData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            disabled={!isEditing}
            className="bg-background" />

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Age"
            type="number"
            value={profileData?.age}
            onChange={(e) => handleInputChange('age', e?.target?.value)}
            disabled={!isEditing}
            min="18"
            max="100"
            className="bg-background" />

          <Select
            label="Activity Level"
            options={activityLevelOptions}
            value={profileData?.activityLevel}
            onChange={(value) => handleInputChange('activityLevel', value)}
            disabled={!isEditing} />

          <Select
            label="Primary Goal"
            options={goalOptions}
            value={profileData?.primaryGoal}
            onChange={(value) => handleInputChange('primaryGoal', value)}
            disabled={!isEditing} />

        </div>

        {/* Account Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-semibold text-primary">47</div>
            <div className="text-sm text-muted-foreground">Days Active</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-accent">23</div>
            <div className="text-sm text-muted-foreground">Routines Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-success">12</div>
            <div className="text-sm text-muted-foreground">Badges Earned</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-secondary">8</div>
            <div className="text-sm text-muted-foreground">Current Streak</div>
          </div>
        </div>
      </div>
    </div>);

};

export default AccountSection;