import React, { useState } from 'react'
import Slider from "react-slick";
// import Card from './card'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useContext, useEffect } from 'react';
import { AppContext } from '../context/contextProvider';
import {
  firestoreGetItemsByCollectionName as getCollectionByName,
  firestoreGetLimitDocs as getLimitCollection,
} from '../services/restApiServices'
import { Link } from 'react-router-dom'

export default function CarList() {
  // const { carList, setcarList } = useContext(AppContext)
  const [newCarList, setnewCarList] = useState([])

  useEffect(() => {
    // if (carList.length ===0) {
    // getAllCars()
    getCars()
    // }
  }, [])

  const getAllCars = async () => {
    let list = await getCollectionByName('posts')
    setnewCarList(list)
    console.log(list)
  }

  const getCars = async () => {
    let list = await getLimitCollection({
      collection: 'posts',
      number: 9
    })
    console.log(list)
    setnewCarList(list)
  }

  const [settings, setSettings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  })

  return (
    <div className="container mt-5" style={{ width: "86%" }}>
      <Slider {...settings}>
        {newCarList.map((car, index) => {
          let random = Math.floor(Math.random() * car.images.length)
          return (
            <div key={index} className="">
              <article className={"card mx-4 "}>
                <img src={car.images[random]} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{car.brand + ' ' + car.model}</h5>
                  <p className="card-text">{'Km ' + car.km}</p>
                  {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                  <Link to={`item/${car.id}`} className="nav-link nav_link">$ {car.price}</Link>
                </div>
              </article>
            </div>
          )
        })}
      </Slider>
    </div>
  )


}
