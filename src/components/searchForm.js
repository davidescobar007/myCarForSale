import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom'
import {
    firestoreGetItemsByCollectionName as getByCollectionName,
    firestoreGetItemsWithCompoundQuery as getCompoundQuery,
} from '../services/restApiServices';
import { AppContext } from '../context/contextProvider';

export default function SearchForm() {

    const { brandList, setbrandList } = useContext(AppContext);
    const { carList, setcarList } = useContext(AppContext)
    const { selectedBrnad, setselectedBrnad } = useContext(AppContext)
    const { selectedModel, setselectedModel } = useContext(AppContext)
    const { selectedYear, setselectedYear } = useContext(AppContext)
    const { yearList, setyearList, } = useContext(AppContext)
    const { priceList, setPriceList } = useContext(AppContext)
    const { selectedPrice, setselectedPrice } = useContext(AppContext)
    const { querySearch, setquerySearch } = useContext(AppContext)

    let history = useHistory();

    useEffect(() => {
        getBrandList();
    }, [])

    const getBrandList = async () => {
        let response = await getByCollectionName('brandList');
        setbrandList(response[0].brand)
    }

    const handleBrandChange = (brand) => {
        setselectedBrnad(brand)

    }

    const handleModelChange = async (model) => {
        setselectedModel(model)
        let response = await getCompoundQuery({
            collectionName: 'posts',
            field: 'model',
            operator: '==',
            condition: model,
            secondField: 'brand',
            secondOperator: '==',
            secondCondition: selectedBrnad,
            // thirdField: 'km',
            // thirdOperator:  '==',
            // thirdCondition: '0'
        })
        if (response) {
            if (response.length > 0) {
                let year = response.map(car => car.year)
                let uniqueYears = [...new Set(year)];
                setyearList(uniqueYears)
                setcarList(response)
            } else {
                setyearList([])
                setPriceList([])
            }
        } else {
            console.log('there is an error, try later.')
        }
    }

    const handleYearChange = (year) => {
        let priceList = carList.filter(car => car.year == year)
        let priceListFiltered = priceList.map(car => car.price)
        let uniquePrice = [...new Set(priceListFiltered)]
        setPriceList(uniquePrice);
        setselectedYear(year)
    }

    const handlePriceChange = (price) => {
        setselectedPrice(price)
    }

    const handleSubmit = () => {
        setquerySearch({
            brand: selectedBrnad,
            model: selectedModel,
            year: selectedYear,
            price: selectedPrice
        })
        history.push("/listado-resultados");
    }

    return (
        <div className="formParent">
            <div className="container">
                <h6 className="text-center">Carros, motos y otros</h6>
                <h1 className="text-center">Tu vehículo está aquí</h1>
                <form onSubmit={handleSubmit} className="row g-3 col-md-9 mx-auto searchForm">
                    <div className="col-md-6">
                        <label htmlFor="marca_vehiculo" className="form-label color--white">Marca</label>
                        <select onChange={e => handleBrandChange(e.target.value)} id="marca_vehiculo" className="form-select" aria-label="Seleccione una marca de vehiculo">
                            <option >Todas Las Marcas</option>
                            {brandList.map((item, index) => <option value={item.brand} key={index}>{item.Brand}</option>)}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="modelo_vehiculo" className="form-label color--white">Modelo</label>
                        <select onChange={e => handleModelChange(e.target.value)} id="modelo_vehiculo" className="form-select" aria-label="Default select example">
                            <option >Todas Los modelos</option>
                            {
                                brandList.map((item, index) =>
                                    item.Brand == selectedBrnad ?
                                        item.Models.map((j, k) =>
                                            <option value={j} key={k} >{j}</option>
                                        ) : null
                                )
                            }
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="anio_vehiculo" className="form-label color--white">Año</label>
                        <select onChange={e => handleYearChange(e.target.value)} id="anio_vehiculo" className="form-select" aria-label="Default select example">
                            <option>Todas Los años</option>
                            {yearList.map((item, index) => <option value={item} key={index}>{item}</option>)}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="anio_vehiculo" className="form-label color--white">Precio</label>
                        <select onChange={e => handlePriceChange(e.target.value)} className="form-select" aria-label="Default select example">
                            <option >Precio hasta</option>
                            {priceList.map((item, index) => <option value={item} key={index}>{item}</option>)}
                        </select>
                    </div>
                    <div className="d-grid col-6 mx-auto">
                        <input onClick={handleSubmit} type="submit" value="Buscar" className="btn btn-primary" type="button"></input>
                    </div>
                </form>
            </div>
        </div>
    )
}
