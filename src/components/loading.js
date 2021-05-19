import React, { useState } from 'react'
import Lottie from 'react-lottie';
import animationData from '../loading-car-effect'

export default function Loading(props) {
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
            <h6 className="text-center ">Estamos guardando los datos de tu publicación.</h6>
            <div 
            className={`animate animate__animated ${!props.exitRight? 'animate__lightSpeedInLeft': 'animate__lightSpeedOutRight'}`}>
                <Lottie
                    options={options}
                    height={300}
                    width={300}>
                    ddsf
            </Lottie>
            </div>
            <h5 className="text-center">Gracias por tu espera...</h5>
        </div>
    )
}
