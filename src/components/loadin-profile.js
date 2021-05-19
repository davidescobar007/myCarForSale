import React, { useState } from 'react'
import Lottie from 'react-lottie';
import animationData from '../loadin-profile.json';

export default function LoadingProfile(props) {
    const [options, setOptions] = useState({
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    })
    return (
        <div className="d-grid col-md-12 mx-auto">
            <div
                className={`text-center animate animate__animated ${!props.entry ? 'animate__fadeInDown' : 'animate__bounceOut'}`}>
                <Lottie
                    options={options}
                    height={309}
                    width={309}>
            </Lottie>
            </div>
        </div>
    )
}
