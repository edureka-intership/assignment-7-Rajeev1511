import React, { Component } from "react";

export default class Welcome extends Component {
  render() {
    const { locationData } = this.props
    return (
      <div>
        <div className="warper">
          <header className="head">
            <nav className="nav">
              <ul className="menu-right">
                <li className="menu-right-item">
                  <a className="nav-link login" href="#">
                    Login
                  </a>
                </li>
                <li className="menu-right-item">
                  <a className="nav-link create" href="#">
                    Create an account
                  </a>
                </li>
              </ul>
            </nav>
          </header>
          <div className="top-background">
            <img src="./image/bg.png" width="100%" className="top-bg-image" />{" "}
          </div>

          <div className="contents-wrapper">
            <h1 className="rounded-circle"> e!</h1>
            <h1 className="heading">Find the best restaurants, cafés, and bars</h1>
            <div className="searchcontainer">
              <div className="search ">
                <form>
                  <div className="row">
                    <div className="searchlocation col-lg-5 col-sm-12 col-md-6">
                      <select
                        className="form-select form-select-md mb-3 location form-control"
                        aria-label=".form-select-lg example"
                      >
                        <option value="0">Please type a  Location</option>
                        {locationData.map((item, index) => {
                          return (
                            <option value={item.locationId} key={index}>
                              {`${item.location}`}
                            </option>
                          )
                        })}
                      </select>
                    </div>

                    <div className="searchresturant  col-lg-7 col-sm-12 col-md-6">
                      <i className="fa fa-search"></i>
                      <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Search for Restaurants"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    );
  }
}
