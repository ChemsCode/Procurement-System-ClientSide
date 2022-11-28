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

const PRICE_REGEX = /\byes\b/;
const REGISTER_URL = "/purchasedItems";

export default function RequestApprovalPopup({ itemId, itemName, supplierName, price, quantity, companyName, buyerName }) {
  const { auth, persist } = useAuth();
  
  console.log(itemId)
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


  const [approval, setApproval] = useState("");
  const [validApproval, setValidApproval] = useState(false);
  const [approvalFocus, setApprovalFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);



  useEffect(() => {
    const result = PRICE_REGEX.test(approval);
    console.log(result);
    console.log(approval);
    setValidApproval(result);
  }, [approval]);

  useEffect(() => {
    setErrMsg("");
  }, [approval]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmApproval = PRICE_REGEX.test(approval);
    if (!confirmApproval) {
      setErrMsg("Invalid Entry/Entries");
      return;
    }
    try {
      const response = await axiosPrivate.put(
        REGISTER_URL,
        JSON.stringify({id: itemId, purchaseApproved: true }),
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
        Approve
      </button>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Are you sure?</h2>
            <section>
              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <h1>Type "yes" in the box to confirm</h1>

              <form onSubmit={handleSubmit}>

                <label htmlFor="price">
                  Price:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validApproval ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={
                      validApproval || !approval ? "hide" : "invalid"
                    }
                  />
                </label>
                <input
                  type="text"
                  id="price" /* username -> price*/
                  autoComplete="off"
                  onChange={(e) => setApproval(e.target.value)}
                  value={approval}
                  required
                  aria-invalid={validApproval ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setApprovalFocus(true)}
                  onBlur={() => setApprovalFocus(false)}
                />
                <p
                  id="pricenote" /*uidnote -> pricenote*/
                  className={
                    approvalFocus && approval && !validApproval
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Answer must be "yes"
                </p>

                <button
                  disabled={
                    !validApproval
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