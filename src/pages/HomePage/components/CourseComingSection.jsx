import React, { useEffect } from "react";
import CourseItem from "../../../components/CourseItem.jsx";
import { Empty } from "antd";
import { COURSE_ITEM_TYPE } from "../../../constants/general.js";
import { useParams } from "react-router-dom";

const CourseComingSection = ({ courses = [], loading = false }) => {
  useEffect(() => {
    function courseComingList() {
      let courseComingSlider = $("#coursecoming__slider");
      courseComingSlider.flickity({
        cellAlign: "left",
        contain: true,
        prevNextButtons: false,
        pageDots: false,
        dragThreshold: 0,
        wrapAround: true,
      });

      $(".coursecoming .control .control__next").on("click", function (e) {
        e.preventDefault();
        courseComingSlider.flickity("next");
      });
      $(".coursecoming .control .control__prev").on("click", function (e) {
        e.preventDefault();
        courseComingSlider.flickity("previous");
      });
    }
    if (courses?.length > 0) {
      courseComingList();
    }
  }, [courses]);
  const { courseSlug } = useParams();
  return (
    <section className="coursecoming --scpadding">
      <div className="container">
        <div className="heading">
          <h2 className="heading__title title --t2">
            Khoá học <span className="color--primary">sắp khai giảng</span>
          </h2>
          <div className="control">
            <div className="control__prev">
              <img src="/img/icon-btn-control.svg" alt="icon prev" />
            </div>
            <div className="control__next">
              <img src="/img/icon-btn-control.svg" alt="icon next" />
            </div>
          </div>
        </div>
      </div>
      {!loading && courses?.length === 0 ? (
        <Empty description="Không tìm thấy khoá học" />
      ) : (
        <div className="coursecoming__list" id="coursecoming__slider">
          {courses?.map((course, index) => {
            return (
              <CourseItem
                slug={courseSlug}
                key={course.id || index}
                {...course}
                type={COURSE_ITEM_TYPE.coming}
              />
            );
          })}
          {/* <div className="coursecoming__item">
          <div className="coursecoming__item-img">
            <a href="course-detail.html">
              <img
                src="https://cfdcircle.vn/files/thumbnails/JUVoVxn36lQtCl20hHoEPMo8JJENBX5qXfI1U13k.jpg"
                alt="Khóa học sắp ra mắt CFD"
              />
            </a>
          </div>
          <div className="coursecoming__item-content">
            <p className="category label">Front-end</p>
            <h2 className="title --t2">
              <a href="course-detail.html">Frontend Master</a>
            </h2>
            <div className="user">
              <div className="user__img">
                <img src="img/avatar_nghia.jpg" alt="Avatar teacher" />
              </div>
              <p className="user__name">Trần Nghĩa</p>
            </div>
            <div className="info">
              <div className="labeltext">
                <span className="label --blue">Ngày khai giảng</span>
                <p className="title --t2">04/05/2023</p>
              </div>
              <div className="labeltext">
                <span className="label --blue">Hình thức học</span>
                <p className="title --t2">Offline | Online</p>
              </div>
            </div>
            <div className="btnwrap">
              <a href="course-order.html" className="btn btn--primary">
                Đăng Ký Học
              </a>
              <a href="course-detail.html" className="btn btn--border --black">
                Xem chi tiết
              </a>
            </div>
          </div>
        </div>
        <div className="coursecoming__item">
          <div className="coursecoming__item-img">
            <a href="course-detail.html">
              <img
                src="https://cfdcircle.vn/files/thumbnails/9VVXxGDc4ujKCegv4zcejuxJ4gC8C1qeXnECvy7s.jpg"
                alt="Khóa học sắp ra mắt CFD"
              />
            </a>
          </div>
          <div className="coursecoming__item-content">
            <p className="category label">Front-End</p>
            <h2 className="title --t2">
              <a href="course-detail.html">Web Responsive</a>
            </h2>
            <div className="user">
              <div className="user__img">
                <img src="img/avatar_nghia.jpg" alt="Avatar teacher" />
              </div>
              <p className="user__name">Trần Nghĩa</p>
            </div>
            <div className="info">
              <div className="labeltext">
                <span className="label --blue">Ngày khai giảng</span>
                <p className="title --t2">04/05/2023</p>
              </div>
              <div className="labeltext">
                <span className="label --blue">Hình thức học</span>
                <p className="title --t2">Offline | Online</p>
              </div>
            </div>
            <div className="btnwrap">
              <a href="course-order.html" className="btn btn--primary">
                Đăng Ký Học
              </a>
              <a href="course-detail.html" className="btn btn--border --black">
                Xem chi tiết
              </a>
            </div>
          </div>
        </div>
        <div className="coursecoming__item">
          <div className="coursecoming__item-img">
            <a href="course-detail.html">
              <img
                src="https://cfdcircle.vn/files/thumbnails/ahvVmtDlrzUPhKLDrc4YkdA8iFbACauYCN76TSGs.jpg"
                alt="Khóa học sắp ra mắt CFD"
              />
            </a>
          </div>
          <div className="coursecoming__item-content">
            <p className="category label">Front-end</p>
            <h2 className="title --t2">
              <a href="course-detail.html">Frontend Newbie</a>
            </h2>
            <div className="user">
              <div className="user__img">
                <img src="img/avatar_nghia.jpg" alt="Avatar teacher" />
              </div>
              <p className="user__name">Trần Nghĩa</p>
            </div>
            <div className="info">
              <div className="labeltext">
                <span className="label --blue">Ngày khai giảng</span>
                <p className="title --t2">04/05/2023</p>
              </div>
              <div className="labeltext">
                <span className="label --blue">Hình thức học</span>
                <p className="title --t2">Offline | Online</p>
              </div>
            </div>
            <div className="btnwrap">
              <a href="course-order.html" className="btn btn--primary">
                Đăng Ký Học
              </a>
              <a href="course-detail.html" className="btn btn--border --black">
                Xem chi tiết
              </a>
            </div>
          </div>
        </div> */}
        </div>
      )}
    </section>
  );
};

export default CourseComingSection;
