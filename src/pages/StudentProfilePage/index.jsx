import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const StudentProfilePage = () => {
  const { profile } = useAuthContext();
  return (
    <main className="mainwrapper profilepage">
      <div className="container">
        <div className="wrapper">
          <div className="sidebar">
            <div className="sidebar__info">
              <div className="useravatar">
                <div className="avatar">
                  <div className="img">
                    <img
                      src={profile?.profileImage || "/img/avatar_nghia.jpg"}
                      alt="avatar"
                    />
                  </div>
                </div>
                <h3 className="title --t3">{profile?.firstName || ""}</h3>
              </div>
            </div>
            <div className="sidebar__content">
              <h4>Giới thiệu</h4>
              <p className="description">{profile?.introduce || ""}</p>
              <ul>
                <li>
                  <img src="/img/icon-mail-outline.svg" alt="icon" />
                  <span>{profile?.email || ""}</span>
                </li>
                <li>
                  <img src="/img/icon-phone-outline.svg" alt="icon" />
                  <span>{profile?.phone || ""}</span>
                </li>
                <li>
                  <img src="/img/icon-link.svg" alt="icon" />
                  <a href="#" target="_blank">
                    {profile?.website || ""}
                  </a>
                </li>
              </ul>
              <div className="social">
                <a href="#">
                  <img src="/img/icon-fb-footer.svg" alt="icon" />
                </a>
                <a href="#">
                  <img
                    src="/img/icon-linkedin-dark.svg"
                    alt="icon"
                    style={{ maxWidth: "20px" }}
                  />
                </a>
                <a href="#">
                  <img src="/img/icon-ytb-ft.svg" alt="icon" />
                </a>
              </div>
            </div>
          </div>
          <div className="tabwrap">
            <div className="tab">
              <div className="tab__title">
                <NavLink end to="/profile">
                  Thông tin cá nhân
                </NavLink>
                <NavLink to="/profile/my-course">Khóa học của tôi</NavLink>
                <NavLink to="/profile/my-payment">Lịch sử thanh toán</NavLink>
              </div>
              <div className="tab__content">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default StudentProfilePage;
