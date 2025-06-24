"use client";
import { FallingLines } from 'react-loader-spinner';
import logo from '../images/logo.svg';
import Image from 'next/image';

const WaitingScreen = () => {
    return (
        <div className=' h-screen fixed w-full flex justify-center items-center'>
            <div className='w-auto flex flex-col justify-center items-center'>
                <Image className='h-[200px] mb-2' src={logo} alt='logoPrestaBook' />
                <FallingLines
                    color="black"
                    width="100"
                    visible={true}
                />
            </div>
        </div>
    );
};

export default WaitingScreen;
