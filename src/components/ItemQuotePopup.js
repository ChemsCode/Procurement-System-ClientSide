import { useRef, useState, useEffect } from "react";
import ".././popup.css";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";

const NAME_REGEX =
  /^([a-zA-Z0-9]+|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{3,}\s{1}[a-zA-Z0-9]{1,})$/;
const PRICE_REGEX = /^\d+$/;
const REGISTER_URL = "/items";

export default function ItemQuotePopup({ itemName }) {
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

  const [userName, setUserName] = useState("");
  const [validUserName, SetValidUserName] = useState(false);
  const [userNameFocus, setUserNameFocus] = useState(false);

  const [price, setPrice] = useState("");
  const [validPrice, setValidPrice] = useState(false);
  const [priceFocus, setPriceFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);


  useEffect(() => {
    const result = NAME_REGEX.test(userName);
    console.log(result);
    console.log(userName);
    SetValidUserName(result);
  }, [userName]);

  useEffect(() => {
    const result = PRICE_REGEX.test(price);
    console.log(result);
    console.log(price);
    setValidPrice(result);
  }, [price]);

  useEffect(() => {
    setErrMsg("");
  }, [userName, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmUserName = NAME_REGEX.test(userName);
    const confirmPrice = PRICE_REGEX.test(price);
    if (!itemName || !confirmUserName || !confirmPrice) {
      setErrMsg("Invalid Entry/Entries");
      return;
    }
    try {
      const response = await axiosPrivate.post(
        REGISTER_URL,
        JSON.stringify({ itemName: itemName, supplierName: userName, price : price}),
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
      setUserName("");
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
            <p>{itemName}</p>
            <section>
              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <h1>Register User Account</h1>

              <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                  Supplier Name:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validUserName ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validUserName || !userName ? "hide" : "invalid"}
                  />
                </label>
                <input
                  type="text"
                  id="username" /* username -> companyname*/
                  autoComplete="off"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  required
                  aria-invalid={validUserName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserNameFocus(true)}
                  onBlur={() => setUserNameFocus(false)}
                />
                <p
                  id="cnidnote" /*uidnote -> cnidnote*/
                  className={
                    userNameFocus && userName && !validUserName
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>

                <label htmlFor="companyemail">
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
                  id="companyemail" /* username -> companyemail*/
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
                  id="emailnote" /*uidnote -> emailnote*/
                  className={
                    priceFocus && price && !validPrice
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Email must be of the following form example@mail.com
                </p>

                <button
                  disabled={
                    !validUserName ||
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