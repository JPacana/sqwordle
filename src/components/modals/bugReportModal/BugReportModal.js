import { useState, useEffect } from "react";
import weedlePNG from "../../../img/weedle.png";

const BugReportModal = ({ isOpen, handleClose, setIsBugReportSuccess }) => {
  const [emailInput, setEmailInput] = useState("");
  const [deviceInput, setDeviceInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  const [isDeviceError, setIsDeviceError] = useState(false);
  const [isDecriptionError, setIsDescriptionError] = useState(false);

  useEffect(() => {
    if (window.location.search.includes("success=true")) {
      setIsBugReportSuccess(true);
    }
  }, []);

  function handleEmailInput(e) {
    setEmailInput(e.target.value);
  }

  function handleDeviceInput(e) {
    setDeviceInput(e.target.value);
  }

  function handleDescriptionInput(e) {
    setDescriptionInput(e.target.value);
  }

  function clearForm() {
    setEmailInput("");
    setDeviceInput("");
    setDescriptionInput("");
    clearErrors();
  }

  function clearErrors() {
    setIsDeviceError(false);
    setIsDescriptionError(false);
  }

  function handleCloseAndClearForm(e) {
    e.preventDefault();
    handleClose();
    clearForm();
  }

  function handleSubmitForm(e) {
    if (!validateForm()) return e.preventDefault();
    // netlify handles form submit
  }

  function validateForm() {
    // no email check needed
    let isValid = true;
    if (deviceInput === "") {
      isValid = false;
      setIsDeviceError(true);
    }
    if (descriptionInput === "") {
      isValid = false;
      setIsDescriptionError(true);
    }
    return isValid;
  }

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={handleClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <img className="pr-2" src={weedlePNG} />
          <p className="modal-card-title">Bug Report</p>
          <button className="delete" aria-label="close" onClick={handleClose}></button>
        </header>
        <section className="modal-card-body has-background-dark has-text-white">
          <div className="content">
            <form name="submit-bug-report" action="/?success=true" method="POST" data-netlify="true">
              <input type="hidden" name="form-name" value="submit-bug-report" />
              <div className="field">
                <label htmlFor="email" className="label has-text-white">
                  Email (optional)
                </label>
                <div className="control has-icons-right">
                  <input
                    className="input"
                    id="email"
                    type="email"
                    name="email"
                    placeholder=""
                    value={emailInput}
                    onChange={handleEmailInput}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="device" className="label has-text-white">
                  Device
                </label>
                <div className="control">
                  <input
                    className="input"
                    id="device"
                    type="text"
                    name="device"
                    placeholder="e.g., Android, iOS, etc..."
                    value={deviceInput}
                    onChange={handleDeviceInput}
                  />
                </div>
                {isDeviceError && <p className="help is-danger">Please fill in this field</p>}
              </div>

              <div className="field">
                <label htmlFor="description" className="label has-text-white">
                  Decription of the issue
                </label>
                <div className="control">
                  <textarea
                    className="textarea"
                    id="description"
                    name="description"
                    placeholder=""
                    value={descriptionInput}
                    onChange={handleDescriptionInput}
                  ></textarea>
                </div>
                {isDecriptionError && <p className="help is-danger">Please fill in this field</p>}
              </div>

              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-link custom-submit-bug-btn" onClick={handleSubmitForm}>
                    Submit
                  </button>
                </div>
                <div className="control">
                  <button className="button is-link is-light custom-cancel-bug-btn" onClick={handleCloseAndClearForm}>
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
        <footer className="modal-card-foot"></footer>
      </div>
    </div>
  );
};

export default BugReportModal;
