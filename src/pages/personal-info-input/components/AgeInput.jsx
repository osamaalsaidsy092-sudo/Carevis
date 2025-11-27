import React from 'react';
import Input from '../../../components/ui/Input';

const AgeInput = ({ value, onChange, error }) => {
  const handleAgeChange = (e) => {
    const age = parseInt(e?.target?.value);
    if (age >= 13 && age <= 120) {
      onChange(age);
    } else if (e?.target?.value === '') {
      onChange('');
    }
  };

  return (
    <div className="space-y-2">
      <Input
        type="number"
        label="Age"
        placeholder="Enter your age"
        value={value}
        onChange={handleAgeChange}
        min={13}
        max={120}
        required
        error={error}
        description="Help us personalize your wellness journey"
        className="text-center"
      />
    </div>
  );
};

export default AgeInput;