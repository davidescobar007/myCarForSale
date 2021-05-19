import React from 'react'
import { Link } from 'react-router-dom'

export default function Card(props) {
    return (
            <article className={"card m-4 car--shadow col-12 col-sm-5 col-md-3"}>
                <img src={props.imgUrl} className="card-img-top" alt="..." width="1000" />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{'Km ' + props.kilometers}</p>
                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                    <Link to={props.url} className="nav-link nav_link">$ {props.price}</Link>
                </div>
            </article>
    )
}
