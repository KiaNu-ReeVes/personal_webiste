import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

function CartModal({ showModal, setShowModal, cardlist, updateItemCount, itemShop, setCardList }) {
  const [showAlert, setShowAlert] = useState(false);

  // تنظیم زمان برای مخفی کردن اعلان
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 10000); // 10 ثانیه
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <div>
      {showAlert && (
        <div role="alert" aria-live="assertive" aria-atomic="true" className="toast fade show customalert" data-bs-autohide="false">
        <div className="toast-header">
          <svg className="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#48ff00"></rect></svg>
          <strong className="me-auto">Cart Message</strong>
          <small>Just Now</small>
          <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div className="toast-body">
            Your purchase was successful
        </div>
      </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Cart List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Count</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cardlist.map((item) => {
                const product = itemShop[item.id];
                return (
                  <tr key={item.id}>
                    <td>{product ? product.name : "Unknown"}</td>
                    <td>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => updateItemCount(item.id, -1)}
                      >
                        +
                      </button>{" "}
                      <span className="btn btn-outline-secondary fs-5">
                        {item.quantity}
                      </span>{" "}
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => updateItemCount(item.id, 1)}
                      >
                        -
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => updateItemCount(item.id, item.quantity)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          {cardlist.length > 0 ? (
            <Button variant="primary" disabled={false} onClick={() => {setShowAlert(true); setCardList([]); setShowModal(false);}}>
              Buy
            </Button>
          ) : (
            <Button variant="primary" disabled={true}>
              Buy
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CartModal;
