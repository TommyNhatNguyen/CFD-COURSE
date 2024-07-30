import React from "react";
import { Link } from "react-router-dom";
import PATHS from "../../constants/paths";

export const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="content">
          <div className="content-item">
            <h3 className="label">Thông tin</h3>
            <ul>
              <li>
                <Link to={PATHS.ABOUT}>Về CFD Circle</Link>
              </li>
              <li>
                <Link to={PATHS?.COURSE?.INDEX}>Khóa học</Link>
              </li>
              <li>
                <Link to={PATHS?.BLOG?.INDEX}>Bài viết</Link>
              </li>
            </ul>
          </div>
          <div className="content-item">
            <h3 className="label">Hỗ trợ</h3>
            <ul>
              <li>
                <Link to={PATHS?.CONTACT}>Trung tâm hỗ trợ</Link>
              </li>
              <li>
                <Link to={PATHS?.PAYMENT}>Phương thức thanh toán</Link>
              </li>
              <li>
                <Link to={PATHS?.PRIVACY}>Chính sách và điều khoản</Link>
              </li>
            </ul>
          </div>
          <div className="content-item">
            <h3 className="label">Kết nối</h3>
            <ul>
              <li>
                <a
                  href="https://www.facebook.com/groups/cfdteam"
                  target="_blank"
                >
                  <i>
                    <img src="/img/icon-cfd-footer.svg" alt="icon" />
                  </i>
                  <span>Cộng đồng</span>
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/cfdcircle" target="_blank">
                  <i>
                    <img src="/img/icon-fb-footer.svg" alt="icon" />
                  </i>
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/cfdcircle" target="_blank">
                  <i>
                    <img src="/img/icon-ytb-ft.svg" alt="icon" />
                  </i>
                  <span>Youtube</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="content-item">
            <h3 className="label">Liên hệ</h3>
            <ul>
              <li>
                <a href="https://goo.gl/maps/RnCAPv3CBjUgTUFd8" target="_blank">
                  <i>
                    <img src="/img/icon-address.svg" alt="icon" />
                  </i>
                  <span>666/46/29 Ba Tháng Hai, phường 14, quận 10, TPHCM</span>
                </a>
              </li>
              <li>
                <a href="tel:0909284493">
                  <i>
                    <img src="/img/icon-phone.svg" alt="icon" />
                  </i>
                  <span>090.928.4493</span>
                </a>
              </li>
              <li>
                <a href="mailto:nguyenanhnhat123456@gmail.com">
                  <i>
                    <img src="/img/icon-mail.svg" alt="icon" />
                  </i>
                  <span>nguyenanhnhat123456@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="bottom">
          <div className="copyright">
            <img src="/img/icon-footer-copy.svg" alt="icon" />
            <span>© 2023 CFD Circle</span>
          </div>
          <a href="./" target="_blank" className="logobct">
            <img src="/img/logo-bo-cong-thuong.png" alt="icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};
