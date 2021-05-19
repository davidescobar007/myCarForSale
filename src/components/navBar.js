import React, { useState, useContext, useEffect } from 'react'
import { Modal } from 'react-responsive-modal';
import { googleSignIn, googleLogOut, } from '../services/restApiServices'
import { AppContext } from '../context/contextProvider';
import { googleProvider } from '../services/authMethod';
import { Link } from "react-router-dom";
import { BiCar, BiMailSend } from "react-icons/bi";

export default function NavBar(props) {
    const { isLoged, setisLoged } = useContext(AppContext)
    const { userInfo, setuserInfo } = useContext(AppContext)
    const [open, setOpen] = useState(false);
    const [isLogedIn, setisLogedIn] = useState(false)
    const [isLoginOut, setisLoginOut] = useState(false)
    const [text, setText] = useState({
        titulo: 'Micarro',
        botonInicioSesion: 'Inicia sesión',
        botonSignUp: 'Crea tu cuenta',
        botonLogOut: 'Cerrar sesión',
    });

    useEffect(() => {
        if (window.localStorage.getItem('userInfo')) {
            let userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
            setuserInfo(userInfo);
            setisLoged(true);
        }
    }, [])

    const handleSignIn = async (provider) => {
        const response = await googleSignIn(provider);
        if (response) {
            let userInfo = {
                uid: response.uid,
                displayName: response.displayName,
                photoURL: response.photoURL,
                email: response.email
            }
            setisLoged(true);
            setuserInfo(userInfo);
            window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
            onCloseModal();
        }
    }

    const handleLogOut = async () => {

        const response = await googleLogOut();
        response && console.log("loged out executed");
        setisLoged(null);
        setuserInfo(null);
        window.localStorage.removeItem('userInfo');
        onCloseModal()
        setisLoginOut(false)
    }

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-warning">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand"><h3>{text.titulo} <BiCar></BiCar></h3></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <span className="navbar-nav me-auto mb-2 mb-lg-0"></span>

                        {!isLoged ? <a className="nav-link nav_link" id="logIn_link" href="#" onClick={onOpenModal}>{text.botonInicioSesion}</a> : null}
                        {!isLoged ? <a className="nav-link nav_link" id="signUp_link" href="#" onClick={onOpenModal}>{text.botonSignUp}</a> : null}


                        {isLoged == true ? <Link to="/-me" className="nav-link nav_link text-dark fw-bolder">{userInfo && userInfo.displayName}</Link> : null}
                        {isLoged == true ? <Link to="/nuevo-registro" className="nav-link nav_link">Publica tu vehículo</Link> : null}
                        {isLoged == true ? <a className="nav-link nav_link" id="logOut_link" href="#" onClick={() => { setisLoginOut(true); onOpenModal() }}>{text.botonLogOut}</a> : null}
                    </div>
                </div>
            </nav>

            <div>
                <Modal open={open} onClose={onCloseModal} center>
                    {isLoginOut === true ?
                        <div>
                            <h2 className="mt-4">¿Deseas salir de tu sesíon?</h2>
                            <div className="modal-body">
                                <div className="d-grid gap-2 col-12 mx-auto">
                                    <button onClick={() => handleLogOut(googleProvider)} id="googleLogIn" className="btn btn-primary" type="button">Cerrar sesíon</button>
                                </div>
                            </div>
                        </div>
                        :
                        <div>
                            <h2 className="mt-4">Ingresa a tu sesión</h2>
                            <div className="modal-body">
                                <div className="d-grid gap-2 col-12 mx-auto">
                                    <button onClick={() => handleSignIn(googleProvider)} id="googleLogIn" className="btn btn-primary" type="button">Google Sign In</button>
                                </div>
                            </div>
                        </div>
                    }
                </Modal>
            </div>
        </div>
    )
}
