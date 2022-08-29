import React, { useContext, useEffect, useState } from 'react'
import { api_base_url } from '../components/AppUrl';
import axios from 'axios'
import { DataContext } from '../store/GlobalState';
import Image from 'next/image';

export default function TrackOrder() {
    const { cart, setCart } = useContext(DataContext);


    return ( 
        <section id="content" className="aboutpage">
  {" "}
  <div className="container">
    {" "}
    <div className="row">
      {" "}
      <div className="col-sm-3">
        {" "}
        <div className="adsbox"> </div>{" "}
      </div>{" "}
      <div className="col-sm-6">
        {" "}
        <div className="subheader">
          {" "}
          <ul className="breadcrumb">
            {" "}
            <li>
              <h2>
                <a href="https://www.dhakabaazar.com/">Home</a>
              </h2>
            </li>{" "}
            <li className="active">
              <h5>অর্ডার ট্র্যাক করুন</h5>
            </li>{" "}
          </ul>{" "}
        </div>{" "}
        <article className="txt">
          {" "}
          <p
            style={{
              boxSizing: "border-box",
              margin: 0,
              padding: 0,
              fontFamily:
                "SolaimanLipi, Helvetica, Verdana, sans-serif !important",
              textAlign: "justify !important",
              color: "gray !important"
            }}
          >
            ১। পণ্যের ডেলিভারী আপডেট পেতে আপনার Mobile Number নাম্বার দিয়ে
            অর্ডার ট্র্যাক করুন।
          </p>{" "}
          <p
            style={{
              boxSizing: "border-box",
              margin: 0,
              padding: 0,
              fontFamily:
                "SolaimanLipi, Helvetica, Verdana, sans-serif !important",
              textAlign: "justify !important",
              color: "gray !important"
            }}
          >
            ২। আপনার অর্ডার করা পণ্যের ডেলিভারীর বর্তমান অবস্থা জানতে নিম্নের
            “টেক্সট বক্স” এ Mobile নাম্বার টি প্রদান করুন এবং “ট্র্যাক অর্ডার”
            বাটনে ক্লিক করুন।
          </p>
          <hr className="break break30" />{" "}
          <form method="post">
            {" "}
            <div
              className="row row5"
              style={{ marginLeft: "-15px", height: 55 }}
            >
              {" "}
              <div className="col-sm-8 col-xs-12">
                {" "}
                <div className="form-group">
                  {" "}
                  <input
                    type="text"
                    style={{
                      backgroundColor: "#d1d1db",
                      borderColor: "rebeccapurple",
                      borderRadius: 13
                    }}
                    className="form-control"
                    name="mobile_id"
                    placeholder="Enter Mobile Number"
                  />{" "}
                </div>{" "}
              </div>{" "}
              <div className="col-sm-4 col-xs-12">
                {" "}
                <div className="form-group">
                  {" "}
                  <button
                    type="submit"
                    id="trackOrder"
                    className="btn btn-primary form-control"
                  >
                    Send{" "}
                  </button>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </form>
          <table
            style={{ backgroundColor: "#fff", width: 553, marginLeft: "-16px" }}
            className="table table-bordered"
          >
            {" "}
            <tbody>
              <tr>
                {" "}
                <th colSpan={2}>
                  <center>Current Status</center>
                </th>{" "}
              </tr>{" "}
              <tr>
                {" "}
                <td width="50%">Order Date</td> <td>১২ july, ২০২২</td>{" "}
              </tr>{" "}
              <tr>
                {" "}
                <td width="50%">Customer Name</td> <td>sumon</td>{" "}
              </tr>{" "}
              <tr>
                {" "}
                <td width="50%">Customer Phone</td> <td>0157113318</td>{" "}
              </tr>{" "}
              <tr>
                {" "}
                <td width="50%">Customer Adress</td> <td>erere</td>{" "}
              </tr>{" "}
              <tr>
                {" "}
                <td width="50%">Courier Service</td> <td />{" "}
              </tr>
              <tr>
                {" "}
                <td width="50%">Order Status</td> <td>new</td>{" "}
              </tr>{" "}
              <tr>
                {" "}
                <td width="50%">Shipment Time</td>
                <td>১২ july, ২০২২</td>
              </tr>{" "}
            </tbody>
          </table>{" "}
          <div
            className="panel-body"
            style={{
              backgroundColor: "#fff",
              marginTop: "-35px",
              width: 550,
              marginLeft: "-15px"
            }}
          >
            {" "}
            <div className="cart-info">
              {" "}
              <table className="table table-bordered">
                {" "}
                <tbody>
                  <tr>
                    {" "}
                    <th className="name">Product</th>{" "}
                    <th className="name">Product Code</th>{" "}
                    <th className="name">Size</th>{" "}
                    <th className="name">Color</th>{" "}
                    <th className="price text-right">Price</th>{" "}
                  </tr>{" "}
                  <tr>
                    {" "}
                    <td className="product-item" style={{ width: "40%" }}>
                      {" "}
                      <a>
                        {" "}
                        
                            <Image
                                src={`https://www.dhakabaazar.com/uploads/16-06-2022-05-09-41-0001_thumb.jpg`}
                                alt="Single Dhaka"
                                width={800}
                                height={800}                                
                             /> 
                        {" "}
                      </a>{" "}
                      <div className="item-name-and-price">
                        {" "}
                        <div className="item-name">
                          {" "}
                          STYX KORE Smart Watch (Bluetooth, 32.51mm) (In Built
                          Games, KORE, Electric Blue, Silicone Strap){" "}
                        </div>{" "}
                        <div className="item-price"> TK 3,500.00 x 1 </div>{" "}
                      </div>{" "}
                    </td>{" "}
                    <td className="text-left" style={{ width: "20%" }}>
                      {" "}
                      Strap{" "}
                    </td>{" "}
                    <td className="text-left" style={{ width: "20%" }}>
                      {" "}
                      1{" "}
                    </td>{" "}
                    <td className="text-left" style={{ width: "20%" }}>
                      {" "}
                      1{" "}
                    </td>{" "}
                    <td className="text-right" style={{ width: "20%" }}>
                      {" "}
                      TK 3,500.00{" "}
                    </td>{" "}
                  </tr>{" "}
                </tbody>
              </table>{" "}
              <table
                className="table table-bordered"
                style={{
                  backgroundColor: "#fff",
                  marginTop: "-20px",
                  width: 521,
                  marginLeft: 0
                }}
              >
                {" "}
                <tbody>
                  {" "}
                  <tr>
                    {" "}
                    <td width="25%">
                      {" "}
                      <span className="extra bold totalamout">
                        Delivery Cost
                      </span>{" "}
                    </td>{" "}
                    <td className="text-right" style={{ width: "50%" }}>
                      {" "}
                      <span className="bold totalamout">TK 70</span>{" "}
                    </td>{" "}
                  </tr>{" "}
                  <tr>
                    {" "}
                    <td width="25%">
                      {" "}
                      <span className="extra bold totalamout">Total</span>{" "}
                    </td>{" "}
                    <td className="text-right" style={{ width: "50%" }}>
                      {" "}
                      <span className="bold totalamout">TK 3,570.00</span>{" "}
                    </td>{" "}
                  </tr>{" "}
                  <tr>
                    {" "}
                    <td style={{}}>
                      {" "}
                      <span className="extra bold">Order number</span>{" "}
                    </td>{" "}
                    <td className="text-right" style={{ width: "50%" }}>
                      {" "}
                      <span className="bold">64246</span>{" "}
                    </td>{" "}
                  </tr>{" "}
                  <tr>
                    {" "}
                    <td style={{}}>
                      {" "}
                      <span className="extra bold">Payment method</span>{" "}
                    </td>{" "}
                    <td className="text-right" style={{ width: "50%" }}>
                      {" "}
                      <span className="bold">Cash On Delivery</span>{" "}
                    </td>{" "}
                  </tr>{" "}
                </tbody>{" "}
              </table>{" "}
            </div>{" "}
          </div>{" "}
        </article>{" "}
      </div>{" "}
    </div>{" "}
  </div>{" "}
</section>
    )
}