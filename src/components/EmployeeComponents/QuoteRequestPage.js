import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ITEM_REQUEST_URL = "/itemRequests";

const NAME_REGEX =
  /^([a-zA-Z0-9]+|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{3,}\s{1}[a-zA-Z0-9]{1,})$/;

const Lounge = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const userNameRef = useRef();
  const errRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const [itemRequest, setItemRequest] = useState("");
  const [validItemRequest, setValidItemRequest] = useState(false);
  const [itemRequestFocus, setItemRequestFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userNameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = NAME_REGEX.test(itemRequest);
    console.log(result);
    console.log(itemRequest);
    setValidItemRequest(result);
  }, [itemRequest]);

  useEffect(() => {
    setErrMsg("");
  }, [itemRequest]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmItemRequest = NAME_REGEX.test(itemRequest);
    if (!confirmItemRequest) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axiosPrivate.post(
        ITEM_REQUEST_URL,
        JSON.stringify({ itemName: itemRequest }),
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
      setItemRequest("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Item Allready Requested!");
      } else {
        setErrMsg("Item Allready Requested?");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to="/employee">Back</Link>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Request Item</h1>

          <form onSubmit={handleSubmit}>
            <label htmlFor="itemName">
              Request Item:
              <FontAwesomeIcon
                icon={faCheck}
                className={itemRequest ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validItemRequest || !itemRequest ? "hide" : "invalid"}
              />
            </label>
            <input
              type="text"
              id="itemName" /* username -> companyname*/
              ref={userNameRef}
              autoComplete="off"
              onChange={(e) => setItemRequest(e.target.value)}
              value={itemRequest}
              required
              aria-invalid={validItemRequest ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setItemRequestFocus(true)}
              onBlur={() => setItemRequestFocus(false)}
            />
            <p
              id="cnidnote" /*uidnote -> cnidnote*/
              className={
                itemRequestFocus && itemRequest && !validItemRequest
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


            <button disabled={!validItemRequest? true : false}>
              Send Data
            </button>
          </form>

          <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
        </section>
      )}
    </>
    // <section>
    //   <h1>Employee Page</h1>
    //   <br />
    //   <p>Page to request quotes.</p>
    //   <div className="flexGrow">
    //     <Link to="/">Home</Link>
    //   </div>
    // </section>
  );
};

export default Lounge;
