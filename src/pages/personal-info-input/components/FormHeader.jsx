import React from 'react';
import Icon from '../../../components/AppIcon';

const FormHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-gentle breathing-animation">
        <Icon name="UserCheck" size={32} color="white" />
      </div>
      
      <h1 className="text-2xl lg:text-3xl font-semibold text-foreground mb-3">
        Tell us about yourself
      </h1>
      
      <p className="text-muted-foreground text-base lg:text-lg leading-relaxed max-w-md mx-auto">
        Help us create a personalized wellness experience that fits your lifestyle and goals.
      </p>
    </div>
  );
};

export default FormHeader;