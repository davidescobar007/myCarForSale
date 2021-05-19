import React, { useEffect, useState } from 'react'
import { BiMailSend } from "react-icons/bi";
import { RiWhatsappLine } from "react-icons/ri";
import { useParams } from 'react-router-dom'
import { firestoreGetItemByDocumentId as getCarById } from '../services/restApiServices'
import { Modal } from 'react-responsive-modal';

export default function CarPost() {
    const [carInfo, setCarInfo] = useState({})
    const [open, setOpen] = useState(false);

    const { id } = useParams()

    useEffect(() => {
        getCar(id)
    }, [])

    const getCar = async (id) => {
        let car = await getCarById({
            colName: 'posts',
            id
        })
        setCarInfo(car[0])
    }

    const modalWhatsApp = () => {
        if (carInfo.email == "davidescobar@gmail.com") {
            window.open('https://wa.me/+573000000000', '_blank');
            return
        }
        setOpen(true)
    }

    return (
        <section className="container mt-5">
            <div className="row">
                <article className="d-grid col-md-12 mx-auto">
                    <div className="row">
                        <div className="col-md-8">
                            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-indicators">
                                    {carInfo.images && carInfo.images.map((item, index) => {
                                        return (
                                            <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} aria-label={`Slide ${index}`} className={index == 0 ? 'active' : ''} aria-current={index == 0 ? 'true' : false}></button>
                                        )
                                    })}
                                </div>
                                <div className="carousel-inner">
                                    {carInfo.images && carInfo.images.map((item, index) => {
                                        return (
                                            <div key={index} className={`carousel-item ${index == 0 ? ' active' : ''}`}>
                                                <img src={item} className="d-block w-100" alt="..." />
                                            </div>
                                        )
                                    })}
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Anterior</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Siguiente</span>
                                </button>
                            </div>
                            <div className="d-flex justify-content-between">
                                <a href={`mailto:${carInfo.email}`} className="btn btn-primary mt-4 col-5"><BiMailSend /> Preguntar</a>
                                <a type="button" onClick={modalWhatsApp} href="#" className="btn btn-outline-dark mt-4 col-5"><RiWhatsappLine /> Whatsapp</a>
                            </div>
                        </div>

                        <section className="col-md-4">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <header>
                                        <h3>{carInfo.brand + ' ' + carInfo.model}</h3>
                                        <h5>$ {carInfo.price ? carInfo.price : 'N/A'}</h5>
                                    </header>
                                </li>
                                <li className="list-group-item d-flex justify-content-between">
                                    Transmisión:  <b>{carInfo.transmision? carInfo.transmision : 'N/A'}</b>
                                </li>
                                <li className="list-group-item d-flex justify-content-between">
                                    Combustible: <b>{carInfo.fuel}</b>
                                </li>
                                <li className="list-group-item d-flex justify-content-between">
                                    Modelo: <b>{carInfo.year}</b>
                                </li>
                                <li className="list-group-item d-flex justify-content-between">
                                    Kilometros: <b>{carInfo.km}</b>
                                </li>
                            </ul>
                        </section>
                    </div>
                </article>
                <article className="col-md-12 mt-4">
                    <h2>Descripción</h2>
                    <p>{carInfo.description ? carInfo.description : 'El vendedor no incluyo una descripción'}</p>
                </article>

            </div>

            <Modal open={open} onClose={() => setOpen(false)} center>
                <h2 className="mt-4">Ooops! 😓</h2>
                <div className="modal-body">
                    <div className="d-grid gap-2 col-12 mx-auto">
                        {/* <div className="alert alert-danger animate__tada animate animate__animated" role="alert">
                            <p></p>
                        </div> */}
                        <div className="d-flex  justify-content-around">
                            <p>No eres usuario premium para contactar directamente con el vendedor por medio de Whatsapp</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </section>
    )
}
