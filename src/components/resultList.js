import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { AppContext } from '../context/contextProvider';
import Card from './card'
import { firestoreGetItemsByCollectionName as getCollectionByName } from '../services/restApiServices'

export default function ResultList() {
    const { carList, setcarList } = useContext(AppContext)
    const { querySearch, setquerySearch } = useContext(AppContext)
    const [newCarList, setnewCarList] = useState([])
    const breakPoints = [
        {
            minScreenWidth: 0,
            maxScreenWidth: 300,
            columns: 1,
            columnWidth: 200,
        },
        {
            minScreenWidth: 300,
            maxScreenWidth: 900,
            columns: 2,
            columnWidth: 300,
        },
        {
            minScreenWidth: 900,
            maxScreenWidth: 1500,
            columns: 4,
            columnWidth: 600,
        },
    ]

    useEffect(() => {
        if (carList.length === 0) {
            getAllCars()
        } else {
            if (querySearch.year !== "" || querySearch.price !== "") {
                let carListByYear = querySearch.year == "" ? carList : carList.filter(car => car.year == querySearch.year)
                let carListByPrice = querySearch.price == "" ? carList : carListByYear.filter(car => car.price == querySearch.price)
                setnewCarList(carListByPrice)
            } else {
                setcarList(carList)
                setnewCarList(carList)
            }
        }
    }, [])

    const getAllCars = async () => {
        let list = await getCollectionByName('posts')
        setnewCarList(list)
    }

    return (
        <section className="container-fluid mt-5">
            <div className="g-3 col-md-11 col-lg-10 col-sm-12 mx-auto row">
                {carList.length == 0 ?
                    <div className="alert alert-primary d-flex align-items-center" role="alert">
                        No encontramos resultados para tu busqueda en particular, pero aqui tienes otras opciones 😉
                    </div>
                    : null}

                <div className="row justify-content-center">
                    {newCarList.map((car, index) => {
                        let random = Math.floor(Math.random() * car.images.length)
                        return (
                            <Card
                                key={index}
                                imgUrl={car.images[random]}
                                title={car.brand + ' ' + car.model}
                                kilometers={car.km}
                                url={`item/${car.id}`}
                                price={car.price}
                            />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
