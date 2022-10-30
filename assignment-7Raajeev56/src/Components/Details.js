import React from "react";
import '../Style/Details.css';
import queryString from 'query-string';
import axios from 'axios';
import Modal from 'react-modal';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

class Details extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurant: {},
            resId: undefined,
            galleryModalIsOpen: false,
            menuItemsModalIsOpen: false,
            menuItems: []
        }
    }

    componentDidMount() {
        const qs = queryString.parse(window.location.search);
        const { restaurant } = qs;

        axios({
            url: `http://localhost:8000/restaurant/${restaurant}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState({ restaurant: res.data.restaurants, resId: restaurant })
            })
            .catch(err => console.log(err))

    }

    handleModal = (state, value) => {
        this.setState({ [state]: value });
    }

    render() {
        const { restaurant, galleryModalIsOpen, menuItemsModalIsOpen, menuItems } = this.state;
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-danger">
                    <div className="container-fluid">
                        <div className="logo_filter">
                            <b>e!</b>
                        </div>
                        <form className="d-flex">
                            <a className="nav-link active text-white" aria-current="page" href="#">login</a>

                            <button className="btn btn-danger border-white" type="button">Create an account</button>
                        </form>
                    </div>
                </nav>
                <div className="bodyDetail container mt-5">
                    <div className="restaurant-img">
                        <img src={`./image/${restaurant.image}`} alt="No Image, Sorry for the Inconvinience" width="100%" height="350" />
                        <button className="button " onClick={() => this.handleModal('galleryModalIsOpen', true)}>Click to see Image Gallery</button>
                    </div>
                    <div className="heading-overview">{restaurant.name}</div>
                    <button className="btn-order btn btn-danger" onClick={() => this.handleModal('menuItemsModalIsOpen', true)}>Place Online Order</button>

                    <div className="tabs">
                        <div className="tab">
                            <input type="radio" id="tab-1" name="tab-group-1" checked />
                            <label for="tab-1">Overview</label>

                            <div className="content">
                                <div className="about">About this place</div>
                                <div className="detailsHead">Cuisine</div>
                                <div className="value">{restaurant && restaurant.cuisine && restaurant.cuisine.map(cuisine => `${cuisine.name}, `)}</div>
                                <div className="detailsHead">Average Cost</div>
                                <div className="value">&#8377; {restaurant.min_price} for two people(approx)</div>
                            </div>
                        </div>

                        <div className="tab">
                            <input type="radio" id="tab-2" name="tab-group-1" />
                            <label for="tab-2">Contact</label>
                            <div className="content">
                                <div className="detailsHead">Phone Number</div>
                                <div className="value">{restaurant.contact_number}</div>
                                <div className="detailsHead">{restaurant.name}</div>
                                <div className="value">{`${restaurant.locality}, ${restaurant.city}`}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={galleryModalIsOpen}
                    style={customStyles} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20 " fill="currentColor" class="bi bi-x" viewBox="0 0 16 16" style={{ float: 'right', margin: '0px 0px 10px 0px' }} onClick={() => this.handleModal('galleryModalIsOpen', false)}>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                    <Carousel showThumbs={false} showStatus={false}>
                        {restaurant?.thumb?.map((item) => {
                            return (
                                <div>
                                    <img src={`./image/${item}`} height="400" />
                                </div>
                            )
                        })}

                    </Carousel>

                </Modal>

            </div>
        )
    }
}

export default Details;