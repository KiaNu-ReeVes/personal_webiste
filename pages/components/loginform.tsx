import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import Cookies from "js-cookie"; // وارد کردن کتابخانه js-cookie

function LoginModal({ showloginModal, setShowloginModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true); // وضعیت محلی برای فعال یا غیرفعال بودن دکمه "Save Changes"
  
  // تابع بررسی وضعیت دکمه "Save Changes" و تغییر وضعیت فعال/غیرفعال آن
  function checkSaveButtonStatus() {
    if (email.trim() !== "" && password.trim() !== "") {
      setIsSaveButtonDisabled(false); // اگر ورودی‌ها پر شده‌اند، دکمه فعال می‌شود
    } else {
      setIsSaveButtonDisabled(true); // در غیر این صورت دکمه غیرفعال می‌شود
    }
  }

  function setUserInfoCookie() {
    const userinfo = {
      email: email,
      password: password,
    };
    Cookies.set("userinfo", JSON.stringify(userinfo), { expires: 7 });
    setShowloginModal(false);
  }

  return (
    <Modal
      show={showloginModal}
      onHide={() => setShowloginModal(false)}
      backdrop="static"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Login Form</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="loginForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                checkSaveButtonStatus(); // بررسی وضعیت دکمه "Save Changes" در هر تغییر در فیلد ایمیل
              }}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="loginForm.ControlInput2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                checkSaveButtonStatus(); // بررسی وضعیت دکمه "Save Changes" در هر تغییر در فیلد پسورد
              }}
              autoFocus
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowloginModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={setUserInfoCookie}
            disabled={isSaveButtonDisabled} // استفاده از وضعیت دکمه برای تنظیم وضعیت دیزیبل
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default LoginModal;
