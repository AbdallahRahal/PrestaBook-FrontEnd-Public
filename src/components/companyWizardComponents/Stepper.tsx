// src/components/Stepper.tsx

import React, { useState, useRef } from 'react';
import StepperSummary from "./StepperSummary";

interface StepperProps {
    currentStep: number;
    children: React.ReactNode;
}


export default function Stepper({ currentStep, children }: StepperProps) {


    return (
        <div>
            <StepperSummary actualStep={currentStep} />
            {React.Children.toArray(children)[currentStep]}
        </div>
    );
}
