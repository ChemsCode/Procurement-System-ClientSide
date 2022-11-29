import { useRef, useState, useEffect } from "react";
import "../.././popup.css";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from '../../hooks/useAuth';

const PRICE_REGEX = /^[1-9][0-9]*$/;
const REGISTER_URL = "/purchasedItems";

export default function PurchasedItemsPopup({ itemName, supplierName, price}) {
  const { auth, persist } = useAuth();
  
  let companyName = auth?.company;
  let buyerName = auth?.user;
  let purchaseApproved = price < 5000 ? true : false;

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
 

  const errRef = useRef();
  const axiosPrivate = useAxiosPrivate();


  const [quantity, setQuantity] = useState("");
  const [validQuantity, setValidQuantity] = useState(false);
  const [quantityFocus, setQuantityFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);



  useEffect(() => {
    const result = PRICE_REGEX.test(quantity);
    console.log(result);
    console.log(quantity);
    setValidQuantity(result);
  }, [quantity]);

  useEffect(() => {
    setErrMsg("");
  }, [quantity]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmQuantity = PRICE_REGEX.test(quantity);
    if (!itemName || !supplierName || !price || !companyName || !confirmQuantity || !buyerName) {
      setErrMsg("Invalid Entry/Entries");
      console.log("Invalid Entry/Entries")
      return;
    }
    try {
      const response = await axiosPrivate.post(
        REGISTER_URL,
        JSON.stringify({ itemName: itemName, supplierName: supplierName, price : price, quantity: quantity, companyName: companyName, buyerName: buyerName, purchaseApproved: purchaseApproved}),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Failed");
      }
      errRef.current.focus();
    }
    toggleModal();
  };

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Buy
      </button>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Purchase Item</h2>
            <section>
              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <h1>{itemName}</h1>

              <form onSubmit={handleSubmit}>

                <label htmlFor="quantity">
                  Quantity:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validQuantity ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={
                      validQuantity || !quantity ? "hide" : "invalid"
                    }
                  />
                </label>
                <input
                  type="number"
                  id="quantity" /* username -> companyemail*/
                  autoComplete="off"
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                  required
                  aria-invalid={validQuantity ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setQuantityFocus(true)}
                  onBlur={() => setQuantityFocus(false)}
                />
                <p
                  id="quantitynote" /*uidnote -> emailnote*/
                  className={
                    quantityFocus && quantity && !validQuantity
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Quantity must be an integer greater than 0.
                </p>

                <button
                  disabled={
                    !validQuantity
                      ? true
                      : false
                  }
                >
                  Submit
                </button>
              </form>
            </section>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}

//test