import React from "react";
import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const COMPANY_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const Register = () => {
  const supplierNameRef = useRef();
  const errRef = useRef();

  const [supplierName, setSupplierName] = useState("");
  const [validSupplierName, setValidSupplierName] = useState(false);
  const [supplierNameFocus, setSupplierNameFocus] = useState(false);

  const [supplierEmail, setSupplierEmail] = useState("");
  const [validSupplierEmail, setValidSupplierEmail] = useState(false);
  const [supplierEmailFocus, setSupplierEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    supplierNameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = COMPANY_REGEX.test(supplierName);
    console.log(result);
    console.log(supplierName);
    setValidSupplierName(result);
  }, [supplierName]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(supplierEmail);
    console.log(result);
    console.log(supplierEmail);
    setValidSupplierEmail(result);
  }, [supplierEmail]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [supplierName, supplierEmail, pwd, matchPwd]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmCompanyName = COMPANY_REGEX.test(supplierName);
    const confirmEmail = EMAIL_REGEX.test(supplierEmail);
    const confirmPwd = PWD_REGEX.test(pwd);
    if (!confirmCompanyName || !confirmEmail || !confirmPwd ){
        setErrMsg("Invalid Entry/Entries");
        return;
    }
    console.log(supplierName, supplierEmail, pwd);
    setSuccess(true);

  }

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Register Supplier Account</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="suppliername">
          Supplier Name:
          <FontAwesomeIcon
            icon={faCheck}
            className={validSupplierName ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validSupplierName || !supplierName ? "hide" : "invalid"}
          />
        </label>
        <input
          type="text"
          id="suppliername" /* username -> companyname*/
          ref={supplierNameRef}
          autoComplete="off"
          onChange={(e) => setSupplierName(e.target.value)}
          value={supplierName}
          required
          aria-invalid={validSupplierName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setSupplierNameFocus(true)}
          onBlur={() => setSupplierNameFocus(false)}
        />
        <p
          id="cnidnote" /*uidnote -> cnidnote*/
          className={
            supplierNameFocus && supplierName && !validSupplierName ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters.
          <br />
          Must begin with a letter.
          <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>

        <label htmlFor="supplieremail">
          Supplier Email:
          <FontAwesomeIcon
            icon={faCheck}
            className={validSupplierEmail ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validSupplierEmail || !supplierEmail ? "hide" : "invalid"}
          />
        </label>
        <input
          type="email"
          id="supplieremail" /* username -> companyemail*/
          ref={supplierNameRef}
          autoComplete="off"
          onChange={(e) => setSupplierEmail(e.target.value)}
          value={supplierEmail}
          required
          aria-invalid={validSupplierEmail ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setSupplierEmailFocus(true)}
          onBlur={() => setSupplierEmailFocus(false)}
        />
        <p
          id="emailnote" /*uidnote -> emailnote*/
          className={
            supplierEmailFocus && supplierEmail && !validSupplierEmail ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Email must be of the following form example@mail.com
        </p>

        <label htmlFor="password">
          Password:
          <FontAwesomeIcon
            icon={faCheck}
            className={validPwd ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validPwd || !pwd ? "hide" : "invalid"}
          />
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <p
          id="pwdnote"
          className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
          Allowed special characters:{" "}
          <span aria-label="exclamation mark">!</span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
        </p>

        <label htmlFor="confirm_pwd">
          Confirm Password:
          <FontAwesomeIcon
            icon={faCheck}
            className={validMatch && matchPwd ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validMatch || !matchPwd ? "hide" : "invalid"}
          />
        </label>
        <input
          type="password"
          id="confirm_pwd"
          onChange={(e) => setMatchPwd(e.target.value)}
          value={matchPwd}
          required
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p
          id="confirmnote"
          className={matchFocus && !validMatch ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password input field.
        </p>

        <button
          disabled={!validSupplierName || !validSupplierEmail || !validPwd || !validMatch ? true : false}
        >
          Sign Up
        </button>
      </form>
    </section>
  );
};

export default Register;
