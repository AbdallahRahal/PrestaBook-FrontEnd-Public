import { CheckIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function StepperSummary({ actualStep }: { actualStep: number }) {

    const stepLabels = ['Details', 'Adresse', 'Contact', 'Images']

    const getColorByStepNumber = (stepNumber: number) => {
        return actualStep >= stepNumber ? 'orange-500' : 'gray-400'
    }

    const getStepperLabelIconClassnameByStepNumber = (stepNumber: number) => {
        let baseClasseName = 'flex text-center size-10 mr-3 rounded-full border-2 '

        if (actualStep == stepNumber) {
            baseClasseName += ' border-orange-500'
            baseClasseName += ' text-orange-500'
        } else if (actualStep > stepNumber) {
            baseClasseName += ' border-orange-500'
            baseClasseName += ' text-white'
            baseClasseName += ' bg-orange-500'
        } else {
            baseClasseName += '  border-gray-400 '
            baseClasseName += '  text-gray-400'
        }

        return baseClasseName
    }

    const RenderStepName = ({ stepNumber }: { stepNumber: number }) => {
        return (
            <div className={'flex items-center py-8 px-2  border-gray-200'} >
                <div className={getStepperLabelIconClassnameByStepNumber(stepNumber)}>
                    {
                        actualStep > stepNumber ?
                            <CheckIcon className='w-[70%] m-auto' />
                            :
                            <p className='w-1/2 m-auto ' > {stepNumber} </p>
                    }
                </div>
                < div className={'font-semibold text-' + getColorByStepNumber(stepNumber)} >
                    {stepLabels[stepNumber]}
                </div>
            </div>
        )
    }

    const BorderArrow = () => {
        return (
            <div className='flex flex-col ' >
                <div className="arrow arrow-top bg-gray-200" > </div>
                < div className="arrow arrow-bottom bg-gray-200" > </div>
            </div>
        )
    }

    return <div className='flex w-full justify-around border-b  mb-6 text-lg shadow-bottom' >
        <RenderStepName stepNumber={0} />
        <BorderArrow />
        <RenderStepName stepNumber={1} />
        <BorderArrow />
        <RenderStepName stepNumber={2} />
        {/*
        <BorderArrow />
        <RenderStepName stepNumber={3} />
        */}
    </div>
}