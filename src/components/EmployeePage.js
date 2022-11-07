import React from "react";
import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { axiosPrivate } from "../api/axios";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const EMPLOYEES_URL = "/employees";

const NAME_REGEX =
  /^([a-zA-Z0-9]+|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{3,}\s{1}[a-zA-Z0-9]{1,})$/;

const Lounge = () => {
  const userNameRef = useRef();
  const errRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userNameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = NAME_REGEX.test(firstName);
    console.log(result);
    console.log(firstName);
    setValidFirstName(result);
  }, [firstName]);

  useEffect(() => {
    const result = NAME_REGEX.test(lastName);
    console.log(result);
    console.log(lastName);
    setValidLastName(result);
  }, [lastName]);

  useEffect(() => {
    setErrMsg("");
  }, [firstName, lastName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmFirstName = NAME_REGEX.test(firstName);
    const confirmLastName = NAME_REGEX.test(lastName);
    if (!confirmFirstName || !confirmLastName) {
      setErrMsg("Invalid Entry/Entries");
      return;
    }
    try {
      const response = await axiosPrivate.post(
        EMPLOYEES_URL,
        JSON.stringify({ firstname: firstName, lastname: lastName }),
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
      setFirstName("");
      setLastName("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
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
            <Link to="/">Input another entry</Link>
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
          <h1>Add new employee do DB</h1>

          <form onSubmit={handleSubmit}>
            <label htmlFor="firstname">
              First Name:
              <FontAwesomeIcon
                icon={faCheck}
                className={firstName ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validFirstName || !firstName ? "hide" : "invalid"}
              />
            </label>
            <input
              type="text"
              id="firstname" /* username -> companyname*/
              ref={userNameRef}
              autoComplete="off"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required
              aria-invalid={validFirstName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setFirstNameFocus(true)}
              onBlur={() => setFirstNameFocus(false)}
            />
            <p
              id="cnidnote" /*uidnote -> cnidnote*/
              className={
                firstNameFocus && firstName && !validFirstName
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

            <label htmlFor="lastname">
              Last Name:
              <FontAwesomeIcon
                icon={faCheck}
                className={lastName ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validLastName || !lastName ? "hide" : "invalid"}
              />
            </label>
            <input
              type="text"
              id="lastname" /* username -> companyname*/
              ref={userNameRef}
              autoComplete="off"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
              aria-invalid={validLastName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setLastNameFocus(true)}
              onBlur={() => setLastNameFocus(false)}
            />
            <p
              id="cnidnote" /*uidnote -> cnidnote*/
              className={
                lastNameFocus && lastName && !validLastName
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

            <button disabled={!validFirstName || !validLastName ? true : false}>
              Send Data
            </button>
          </form>
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
