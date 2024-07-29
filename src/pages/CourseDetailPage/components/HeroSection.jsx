import React from "react";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";
import { message } from "antd";
import { useAuthContext } from "../../../context/AuthContext";

const HeroSection = ({
  title,
  startDate,
  duration,
  tags,
  orderLink,
  teacherInfo,
  image,
  price,
  isAlreadySignUp,
}) => {
  const _onCopyLink = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href);
    message.success("Copy link thành công");
  };
  return (
    <section className="hero herodetail">
      <div className="hero__content">
        <div className="container">
          <h3 className="category label --white">frontend</h3>
          <h2 className="title --white">{title || ""}</h2>
          <div className="infor">
            <div className="infor__item">
              <label className="label --white">Khai giảng</label>
              <p className="title --t3 --white">{startDate || ""}</p>
            </div>
            <div className="infor__item">
              <label className="label --white">Thời lượng</label>
              <p className="title --t3 --white">{duration || ""} buổi</p>
            </div>
            <div className="infor__item">
              <label className="label --white">Hình thức</label>
              <p className="title --t3 --white">{tags}</p>
            </div>
          </div>
          {isAlreadySignUp ? (
            <Button className="btn-regcourse --disable">Đã đăng ký</Button>
          ) : (
            <Button link={orderLink} className="btn-regcourse ">
              Đăng ký
            </Button>
          )}
        </div>
      </div>
      <div className="hero__bottom">
        <div className="container-fluid">
          <a href="#" className="user">
            <div className="user__img">
              <img src={teacherInfo?.image || ""} alt="Avatar teacher" />
            </div>
            <p className="user__name --white">{teacherInfo?.name || ""}</p>
          </a>
          <div className="pricebox">
            <p className="title --t3 --white">{price || ""} VND</p>
          </div>
          <Link
            to="https://www.facebook.com/sharer/sharer.php?sdk=joey&u=https://cfdcircle.vn/khoa-hoc/khoa-hoc-lap-trinh-frontend-master-30&display=popup&ref=plugin&src=share_button"
            // onclick="return !window.open(this.href, 'Facebook', 'width=640,height=580')"
            onClick={_onCopyLink}
            className="sharebox s--white"
          >
            Chia sẻ
            <i>
              <img
                src="https://cfdcircle.vn/img/iconshare.svg"
                alt="CFD Circle"
              />
            </i>
          </Link>
        </div>
      </div>
      <div className="hero__background">
        <img
          className="hero__background-img"
          src={image || ""}
          alt="CFD Circle"
        />
      </div>
    </section>
  );
};

export default React.memo(HeroSection);
