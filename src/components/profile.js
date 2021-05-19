import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../context/contextProvider'
import { Link } from 'react-router-dom'
import { firestoreGetItemsWithSingleCompoundQuery as getCarList } from '../services/restApiServices'
import LoadinProfile from './loadin-profile'
import { MdDeleteSweep } from 'react-icons/md'
import { AiFillEye } from 'react-icons/ai'
import { firestoreDeleteDocument as deleteDoc } from '../services/restApiServices'
import { Modal } from 'react-responsive-modal';


export default function Profile() {
    const { userInfo, setuserInfo } = useContext(AppContext)
    const { isLoged, setisLoged } = useContext(AppContext)
    const [carList, setcarList] = useState([])
    const [isLoading, setisLoading] = useState(true)
    const [exitLoading, setexitLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [id, setid] = useState(null)

    useEffect(() => {
        if (window.localStorage.getItem('userInfo')) {
            let userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
            setuserInfo(userInfo);
            setisLoged(true);
            getItem(userInfo.uid)
        }
    }, [])

    const getItem = async (id) => {
        let carList = await getCarList({
            collectionName: 'posts',
            field: 'uid',
            operator: '==',
            condition: id
        })
        setcarList(carList)
        setTimeout(() => {
            setexitLoading(true)
            setTimeout(() => { setisLoading(false) }, 1500)
        }, 1000)
    }
    const onDelete = async (id) => {
        setOpen(true)
        setid(id)
    }

    const deleteAction = async () => {
        let deletedCar = await deleteDoc({
            collection: 'posts',
            document: id
        })
        console.log(deletedCar)
        let newCarLis = carList.filter(car => car.id !== id)
        setcarList(newCarLis)
        setOpen(false)
    }



    return (
        <section className="container mt-5">
            { isLoading == true ?
                <LoadinProfile
                    entry={exitLoading}
                /> :
                <div className="row row g-3 col-md-9 mx-auto">
                    <div className="list-group">
                        <div className="mt-5 list-group-item active" aria-current="true">
                            <img className="profile_image" src={userInfo && userInfo.photoURL} alt="" />
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-2">{userInfo && userInfo.displayName}</h5>
                            </div>
                            <p className="mb-2">{userInfo && userInfo.email}</p>
                        </div>
                        <div className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between mb-5">
                                <h5 className="mb-1">Tus publicaciones</h5>
                                <span className="badge bg-warning text-dark rounded-pill px-3 pt-2">{carList.length} publicaciones</span>
                            </div>
                            {

                                carList.length === 0 ?
                                    <div className="alert alert-success" role="alert">
                                        <p>No cuentas con publicaciones aún, animate a publicar un coche haciendo click donde dice Publica tu vehìculo ⬆</p>
                                    </div>
                                    :
                                    carList.map((car, index) => {
                                        return (
                                            <div key={index} className="card mb-3">
                                                <div className="card-body d-flex w-100 justify-content-between">
                                                    <h5>{`${car.brand} ${car.model} ${car.year}`}</h5>
                                                    <div className="d-flex justify-content-evenly">
                                                        <Link to={`/item/${car.id}`} className=" btn btn-primary mx-1 desktop">Ver publicacion</Link>
                                                        <button type="button" onClick={() => onDelete(car.id)} className="mx-1 btn btn-outline-danger desktop">Eliminar</button>
                                                        <Link to={`/item/${car.id}`} className=" btn btn-primary mx-1 mobil" role="button"><AiFillEye /></Link>
                                                        <button type="button" onClick={() => onDelete(car.id)} className="mx-1 btn btn-outline-danger mobil"><MdDeleteSweep /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                        </div>
                    </div>
                </div>
            }
            <Modal open={open} onClose={() => setOpen(false)} center>
                <h2 className="mt-4">¿Estas Seguro de eliminar esta publicación? 🤔</h2>
                <div className="modal-body">
                    <div className="d-grid gap-2 col-12 mx-auto">
                        <div className="alert alert-danger animate__tada animate animate__animated" role="alert">
                            <p>Si eliminas esta publicación, <b>no hay vuelta atras!</b></p>
                        </div>
                        <div className="d-flex  justify-content-around">
                            <button onClick={deleteAction} className="btn btn-danger">Eliminar</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </section>
    )
}
