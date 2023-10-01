import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import itemShop from "./components/shopitems";
import LoginModal from "./components/loginform";
import CartModal from "./components/cartModal";
import Cookies from "js-cookie"; // وارد کردن کتابخانه js-cookie

function IndexPage() {
  const [showloginModal, setShowloginModal] = useState(false);
  const [showcartModal, setShowcartModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [cardlist, setCardList] = useState([]);

  function buyitemHandler(id: number) {
    const userinfoCookie = Cookies.get("userinfo");
    if (userinfoCookie) {
      const userinfo = JSON.parse(userinfoCookie);
      // چک کردن محتوای کوکی برای ورود
      if (userinfo.email && userinfo.password) {
        setIsLogin(true);

        // ایجاد مورد جدید با مقدار quantity
        const newItem = { id: id, quantity: 1 }; // مثال: تعداد اولیه 1

        // بررسی آیا مورد مشابه در cardlist وجود دارد
        const existingItem = cardlist.find((item) => item.id === id);

        // اگر مورد مشابه وجود دارد، تعداد آن را افزایش دهید
        if (existingItem) {
          existingItem.quantity += 1;
          setCardList([...cardlist]); // برای تحریک بروزرسانی وضعیت
        } else {
          // در غیر این صورت، مورد جدید را به cardlist اضافه کنید
          setCardList((prevCardList) => [...prevCardList, newItem]);
        }
      } else {
        setIsLogin(false);
        setShowloginModal(true);
      }
    } else {
      setIsLogin(false);
      setShowloginModal(true);
    }
  }
  function getItemCountById(id: number): number {
    // جمع کردن تمام مقادیر quantity برای موارد با id مشخص
    const totalQuantity = cardlist
      .filter((item) => item.id === id)
      .reduce((sum, item) => sum + item.quantity, 0);
  
    return totalQuantity;
  }
  
  function updateItemCount(id: number, quantity: number) {
    setCardList((prevCardList) => {
      const updatedList = prevCardList.map((item) => {
        if (item.id === id) {
          // اگر مورد با id مشخص باشد، تعداد آن را با مقدار quantity افزایش یا کاهش دهید
          item.quantity -= quantity;
        }
        return item;
      });

      // حذف موارد با تعداد 0 از لیست
      const filteredList = updatedList.filter((item) => item.quantity !== 0);

      return filteredList;
    });
  }
  function renderQuantityButtons(index) {
    const itemCount = getItemCountById(index);

    return (
      <div>
        <button className="btn btn-outline-secondary mx-2" onClick={() => buyitemHandler(index)}>+</button>
        <span className="fs-5 btn btn-outline-secondary">{itemCount}</span>
        <button className="btn btn-outline-secondary mx-2" onClick={() => updateItemCount(index, 1)}>-</button>
        <br />
        <button className="btn btn-outline-secondary m-3" onClick={() => updateItemCount(index, itemCount)}>Remove From Cart</button>
      </div>
    );
  }

  return (
    <div className="container-lg">
      <div className="row">
        <div className="col-12 fs-1 fw-bold py-4 d-inline">
          Item Shop{" "}
          <div
            className="btn btn-secondary float-end mt-2 position-relative"
            onClick={() => setShowcartModal(true)}
          >Cart
            {cardlist.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cardlist.length}
                </span>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        {itemShop.map((item, index) => (
          <div className="col-3" key={index}>
            <div className="card text-center justify-content-center p-3">
              <img
                src={item.image}
                className="card-img-top custom-imgsize"
                alt={item.name}
              ></img>
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.desc}</p>
                {getItemCountById(index) > 0 ? (
                  renderQuantityButtons(index)
                ) : (
                  <div
                    onClick={() => buyitemHandler(index)}
                    className="btn btn-primary"
                  >
                    Buy Item
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* اضافه کردن Modal */}
      <LoginModal showloginModal={showloginModal} setShowloginModal={setShowloginModal} />
      {/* اضافه کردن Modal */}
      <CartModal showModal={showcartModal} setShowModal={setShowcartModal} cardlist={cardlist} updateItemCount={updateItemCount} itemShop={itemShop} setCardList={setCardList}  />
    </div>
  );
}

export default IndexPage;
