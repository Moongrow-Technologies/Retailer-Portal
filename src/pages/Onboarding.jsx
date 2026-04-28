import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingShell from '@/components/onboarding/OnboardingShell';
import StepStoreDetails from '@/components/onboarding/StepStoreDetails';
import StepInviteStaff from '@/components/onboarding/StepInviteStaff';
import StepWallet from '@/components/onboarding/StepWallet';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const handleStepNext = () => setStep(s => s + 1);
  const handleSkip = () => setStep(s => s + 1);
  const handleDone = () => navigate('/');

  return (
    <OnboardingShell step={step} onBack={step > 0 ? () => setStep(s => s - 1) : null}>
      {step === 0 && (
        <StepStoreDetails onNext={handleStepNext} />
      )}
      {step === 1 && (
        <StepInviteStaff onNext={handleStepNext} onSkip={handleSkip} />
      )}
      {step === 2 && (
        <StepWallet onSkip={handleDone} />
      )}
    </OnboardingShell>
  );
}