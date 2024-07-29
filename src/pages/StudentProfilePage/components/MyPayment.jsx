import React from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { Empty } from "antd";
import { formatCurrency, formatDate } from "../../../utils/format";

const MyPayment = () => {
  const { paymentInfo } = useAuthContext();
  const PAYMENT_METHOD = {
    atm: "Chuyển khoản",
    cash: "Tiền mặt",
    momo: "Chuyển khoản Momo",
  };
  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      {!!!paymentInfo && (
        <Empty description="Không tìm thấy khoản thanh toán nào" />
      )}
      {paymentInfo?.map((item, index) => {
        return (
          <div key={item?.id || index} className="itemhistory">
            <div className="name">{item?.course?.name || ""}</div>
            <div className="payment">
              {PAYMENT_METHOD[item?.paymentMethod] || ""}
            </div>
            <div className="date">{formatDate(item?.updatedAt) || ""}</div>
            <div className="money">
              {formatCurrency(item?.course?.price) || ""} VND
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyPayment;
