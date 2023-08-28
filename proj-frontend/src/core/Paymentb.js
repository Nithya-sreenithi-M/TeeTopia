import React, { useState, useEffect } from "react";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { getmeToken, processPayment } from "./helper/paymentbhelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticate } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";

const Paymentb = ({ products, setReload = f => f, reload = undefined })=>{

  //State to track payment success and state
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {}
  });

  //Variables need to be passed on when getToken is executed
  const userId = isAuthenticate() && isAuthenticate().user._id;
  const token = isAuthenticate() && isAuthenticate().token;

  //Immediately after loading the page, we need getToken to initiate payment
  useEffect(() => {
    getToken(userId, token);
  }, []);

  //getToken: Makes a backend call to get client token
  const getToken = (userId, token) => {
    // info is the response
    getmeToken(userId, token).then(res => {
       console.log("INFORMATION", res);
      if(res){
        if (res.error) {
          setInfo({ ...info, error: res.error });
        } else {
          const clientToken = res.clientToken;
          setInfo({ clientToken });
        }
      }
    }).catch("No response");
  };

  //total amount
  const getAmount = () => {
    let amount = 0;
    products.map(p => {
      amount = amount + p.price;
    });
    return amount;
  };

  const showbtdropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={instance => (info.instance = instance)}
            />
            <button className="btn btn-block btn-success" onClick={onPurchase}>
              Buy
            </button>
          </div>
        ) : (
          <h3>Please login or add something to cart</h3>
        )}
      </div>
    );
  };

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then(data => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount()
      };
      processPayment(userId, token, paymentData)
        .then(response => {
          setInfo({ ...info, success: response.success, loading: false });
          console.log("PAYMENT SUCCESS");
          //TODO: empty the cart
          //TODO: force reload
        })
        .catch(error => {
          setInfo({ loading: false, success: false });
          console.log("PAYMENT FAILED");
        });
    });
  };

  return (
    <div>
      <h3>Your bill is {getAmount()} $</h3>

      {showbtdropIn()}
    </div>
  );
};



export default Paymentb;