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

const PRICE_REGEX = /(\d+\.\d{1,2})/;
const REGISTER_URL = "/items";

export default function ItemQuotePopup({ itemName }) {
  const { auth, persist } = useAuth();
  
  let supName = auth?.company;

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


  const [price, setPrice] = useState("");
  const [validPrice, setValidPrice] = useState(false);
  const [priceFocus, setPriceFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);



  useEffect(() => {
    const result = PRICE_REGEX.test(price);
    console.log(result);
    console.log(price);
    setValidPrice(result);
  }, [price]);

  useEffect(() => {
    setErrMsg("");
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmPrice = PRICE_REGEX.test(price);
    if (!itemName || !supName || !confirmPrice) {
      setErrMsg("Invalid Entry/Entries");
      return;
    }
    try {
      const response = await axiosPrivate.post(
        REGISTER_URL,
        JSON.stringify({ itemName: itemName, supplierName: supName, price : price}),
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
        Add Quote
      </button>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Add Quote</h2>
            <section>
              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <h1>Quote for {itemName}</h1>

              <form onSubmit={handleSubmit}>

                <label htmlFor="price">
                  Price:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validPrice ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={
                      validPrice || !price ? "hide" : "invalid"
                    }
                  />
                </label>
                <input
                  type="number"
                  id="price" /* username -> price*/
                  autoComplete="off"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  required
                  aria-invalid={validPrice ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setPriceFocus(true)}
                  onBlur={() => setPriceFocus(false)}
                />
                <p
                  id="pricenote" /*uidnote -> pricenote*/
                  className={
                    priceFocus && price && !validPrice
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Price must be of format X.xx
                </p>

                <button
                  disabled={
                    !validPrice
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