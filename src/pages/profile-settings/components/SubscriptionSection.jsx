import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SubscriptionSection = () => {
  const [currentPlan] = useState('premium');
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Basic wellness features',
      features: [
        'Basic exercise routines',
        'Simple progress tracking',
        'Community access',
        'Limited customization'
      ],
      limitations: [
        'Max 3 routines per day',
        'Basic analytics only',
        'No team features'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: { monthly: 9.99, yearly: 99.99 },
      description: 'Complete wellness experience',
      features: [
        'Unlimited exercise routines',
        'Advanced progress analytics',
        'Personalized recommendations',
        'Team collaboration features',
        'Priority support',
        'Export capabilities'
      ],
      popular: true
    },
    {
      id: 'team',
      name: 'Team',
      price: { monthly: 19.99, yearly: 199.99 },
      description: 'For teams and organizations',
      features: [
        'Everything in Premium',
        'Team dashboard & analytics',
        'Admin management tools',
        'Bulk user management',
        'Custom branding',
        'Advanced reporting'
      ]
    }
  ];

  const currentPlanData = plans?.find(plan => plan?.id === currentPlan);
  const nextBillingDate = new Date();
  nextBillingDate?.setMonth(nextBillingDate?.getMonth() + 1);

  const handlePlanChange = (planId) => {
    console.log('Changing to plan:', planId);
  };

  const handleBillingCycleChange = (cycle) => {
    setBillingCycle(cycle);
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-gentle border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="CreditCard" size={24} className="text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Subscription & Billing</h2>
      </div>
      <div className="space-y-6">
        {/* Current Plan Status */}
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Crown" size={20} color="white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{currentPlanData?.name} Plan</h3>
                <p className="text-sm text-muted-foreground">{currentPlanData?.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                ${currentPlanData?.price?.[billingCycle]}
              </div>
              <div className="text-sm text-muted-foreground">
                per {billingCycle === 'monthly' ? 'month' : 'year'}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Next billing: {nextBillingDate?.toLocaleDateString()}
            </span>
            <Button variant="ghost" size="sm" className="text-primary">
              Manage Billing
            </Button>
          </div>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex items-center justify-center">
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleBillingCycleChange('monthly')}
              className="rounded-md"
            >
              Monthly
            </Button>
            <Button
              variant={billingCycle === 'yearly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleBillingCycleChange('yearly')}
              className="rounded-md"
            >
              Yearly
              <span className="ml-1 text-xs bg-success text-white px-1.5 py-0.5 rounded">
                Save 17%
              </span>
            </Button>
          </div>
        </div>

        {/* Available Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {plans?.map((plan) => (
            <div
              key={plan?.id}
              className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                plan?.id === currentPlan
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              } ${plan?.popular ? 'ring-2 ring-primary/20' : ''}`}
            >
              {plan?.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-foreground">{plan?.name}</h3>
                <div className="text-3xl font-bold text-primary mt-2">
                  ${plan?.price?.[billingCycle]}
                </div>
                <div className="text-sm text-muted-foreground">
                  per {billingCycle === 'monthly' ? 'month' : 'year'}
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan?.description}</p>
              </div>

              <div className="space-y-2 mb-4">
                {plan?.features?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
                {plan?.limitations?.map((limitation, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="X" size={16} className="text-muted-foreground flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{limitation}</span>
                  </div>
                ))}
              </div>

              <Button
                variant={plan?.id === currentPlan ? 'outline' : 'default'}
                fullWidth
                onClick={() => handlePlanChange(plan?.id)}
                disabled={plan?.id === currentPlan}
              >
                {plan?.id === currentPlan ? 'Current Plan' : 'Upgrade'}
              </Button>
            </div>
          ))}
        </div>

        {/* Billing History */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-foreground">Billing History</h3>
            <Button variant="ghost" size="sm" iconName="Download" iconPosition="left">
              Download All
            </Button>
          </div>
          <div className="space-y-3">
            {[
              { date: '2024-11-01', amount: 9.99, status: 'paid' },
              { date: '2024-10-01', amount: 9.99, status: 'paid' },
              { date: '2024-09-01', amount: 9.99, status: 'paid' }
            ]?.map((invoice, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center space-x-3">
                  <Icon name="FileText" size={16} className="text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      Premium Plan - {new Date(invoice.date)?.toLocaleDateString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Status: {invoice?.status?.charAt(0)?.toUpperCase() + invoice?.status?.slice(1)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-foreground">${invoice?.amount}</span>
                  <Button variant="ghost" size="sm">
                    <Icon name="Download" size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSection;