import React, { useState, useContext, useEffect } from 'react';
import { Modal } from 'react-responsive-modal';
import Resizer from "react-image-file-resizer";
import uniqid from 'uniqid';
import { AppContext } from '../context/contextProvider';
import Loadin from './loading'
import {
    firestoreGetItemsByCollectionName as getCollectionByName,
    fireStorageUploadImage as uploadImage,
    firestoreSaveDoc
} from '../services/restApiServices';

export default function AddPost() {
    const { brandList, setbrandList } = useContext(AppContext);
    const { imageUrls, setImageUls } = useContext(AppContext)
    // const { selectedBrnad, setselectedBrnad } = useContext(AppContext)
    const { userInfo, setuserInfo } = useContext(AppContext)
    const { isLoged, setisLoged } = useContext(AppContext)
    const [files, setFiles] = useState([])
    const [formData, setFormData] = useState({})
    const [isLoadin, setIsLoadin] = useState(false)
    const [exitRight, setExitRight] = useState(false)
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getBrandList();
    }, [])

    const getBrandList = async () => {
        let response = await getCollectionByName('brandList');
        setbrandList(response[0].brand)
    }

    const handleImages = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            let imageFile = e.target.files[i];
            console.log(imageFile)
            try {
                Resizer.imageFileResizer(
                    imageFile,
                    700,
                    500,
                    "JPEG",
                    65,
                    0,
                    (optimizedImg) => {
                        console.log(optimizedImg);
                        setFiles(prevState => [...prevState, optimizedImg]);
                    },
                    "file",
                    700,
                    500
                );
            } catch (err) {
                console.log(err);
            }

        }
    }

    const onUploadSubmission = e => {
        if (!isLoged) {
            alert("inicia sesión para poder crear una publicación")
            return
        }
        e.preventDefault();
        const promises = [];
        let urlArray = []
        let imageBigSize = files.some(file => file.size > 3000000)
        if (imageBigSize) {
            alert("una de tus imagenes excede el el tamaño maximo recomendado de 3 Mb")
            setFiles([])
            return
        }
        setIsLoadin(true)
        files.forEach(file => {





            let pushPromisesFunc = uploadTask => { promises.push(uploadTask) }
            let pushArlFunc = imageUrl => { urlArray.push(imageUrl) }
            uploadImage(file, pushPromisesFunc, pushArlFunc)
        });
        Promise.all(promises)
            .then(() => {
                setImageUls(urlArray)
                setTimeout(() => {
                    urlArray.map(i => console.log(i))
                    saveNewPost(urlArray)

                }, 2500)
            })
            .catch(err => console.log(err.code));
    }

    const saveNewPost = (imageUrlArry) => {
        let carData = formData
        carData.images = imageUrlArry
        carData.uid = userInfo.uid
        carData.email = userInfo.email
        firestoreSaveDoc({
            doc: uniqid(undefined, uniqid.process()),
            collection: "posts",
            data: carData
        }, () => {
            setExitRight(true);
            setFormData({})
            setFiles([])
            setTimeout(() => {
                setIsLoadin(false)
                setOpen(true)
            }, 1600)
        })
    }

    return (
        <div className="container pt-5">
            <Modal open={open} onClose={() => {setOpen(false); setExitRight(false)}} center>
                <h2 className="mt-4">Enhorabuena! 😁</h2>
                <div className="modal-body">
                    <div className="d-grid gap-2 col-12 mx-auto">
                        <p>Tu plublicación ha sido publicada exitosamente ✅</p>
                    </div>
                </div>
            </Modal>
            {isLoadin == false ?

                <form onSubmit={e => onUploadSubmission(e)} className="row g-3 needs-validation container_card">
                    <h3>Publica tu vehiculo</h3>
                    <div className="col-md-6">
                        <label htmlFor="validationCustom01" className="form-label">Marca</label>
                        <select onChange={e => setFormData({ ...formData, brand: e.target.value })} id="marca_vehiculo" className="form-select" aria-label="Seleccione una marca de vehiculo" required>
                            <option >Todas Las Marcas</option>
                            {brandList.map((item, index) => <option value={item.brand} key={index}>{item.Brand}</option>)}
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="validationCustom02" className="form-label">Modelo</label>
                        <select onChange={e => setFormData({ ...formData, model: e.target.value })} className="form-select" id="validationCustom02" required>
                            <option>Todos los modelos</option>
                            {
                                brandList.map((item, index) =>
                                    item.Brand == formData.brand && formData.brand ?
                                        item.Models.map((j, k) =>
                                            <option value={j} key={k} >{j}</option>
                                        ) : null
                                )
                            }
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="validationCustomUsername" className="form-label">Año</label>
                        <div className="input-group">
                            <input value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} type="number" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="validationCustom03" className="form-label">Kilometraje</label>
                        <input value={formData.km} onChange={e => setFormData({ ...formData, km: e.target.value })} type="number" className="form-control" id="validationCustom03" required />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="validationCustom04" className="form-label">Trasmision</label>
                        <select onChange={e => setFormData({ ...formData, transmision: e.target.value })} className="form-select" id="validationCustom04" required>
                            <option>Selecciona el tipo de Transmisión</option>
                            <option value="Automatico">Automatico</option>
                            <option value="Manual">Manual</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="validationCustom05" className="form-label">Tipo combustible</label>
                        <select onChange={e => setFormData({ ...formData, fuel: e.target.value })} className="form-select" id="validationCustom05" required>
                            <option>Selecciona el tipo de combustible</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Gasolina">Gasolina</option>
                            <option value="Electrico">Electrico</option>
                            <option value="Hibrido">Hibrido</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="formFileMultiple" className="form-label">Imagenes</label>
                        <input onChange={(e) => handleImages(e)} className="form-control" type="file" id="formFileMultiple" multiple accept="image/*" />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="validationCustom05" className="form-label">Precio</label>
                        <input onChange={e => setFormData({ ...formData, price: e.target.value })} type="number" className="form-control" id="validationCustom05" required />
                    </div>

                    <div className="col-md-12 mt-4 form-floating">
                        <textarea onChange={e => setFormData({ ...formData, description: e.target.value })} className="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                        <label htmlFor="floatingTextarea">Agrega aqui la descripción de la publicación</label>
                    </div>

                    <div className="col-md-5 mx-auto d-grid mt-3">
                        <button onClick={(e) => onUploadSubmission(e)} className="mt-3 btn btn-primary" type="button">Submit form</button>
                    </div>
                </form>
                :
                <Loadin
                    exitRight={exitRight}
                />

            }
        </div>

    )
}
