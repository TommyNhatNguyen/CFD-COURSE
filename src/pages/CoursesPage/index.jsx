import React, { useState } from "react";
import { Link } from "react-router-dom";
import PATHS from "../../constants/paths";
import Button from "../../components/Button";
import useQuery from "../../hooks/useQuery";
import courseService from "../../services/courseService";
import { Empty, Skeleton } from "antd";
import CourseItem from "../../components/CourseItem.jsx";
import useDebounce from "../../hooks/useDebounce";

const CoursesPage = () => {
  // Get course data using useQuery Hook
  const { data, loading: apiLoading } = useQuery(courseService.getCourse);
  const courses = data?.courses || [];
  console.log("courses", courses);
  const loading = useDebounce(apiLoading, 300);
  return (
    <main className="mainwrapper courses --ptop">
      <div className="container">
        <div className="textbox">
          <div className="container">
            <h2 className="title --t2">Tất cả khoá học</h2>
          </div>
        </div>
        <div className="courses__list">
          {!loading && courses?.length === 0 && (
            <Empty description="Không tìm thấy dữ liệu" />
          )}
          {loading &&
            Array(4)
              .fill("")
              .map((_, index) => {
                return (
                  <div
                    key={index}
                    className="courses__list-item"
                    style={{
                      height: "50vh",
                    }}
                  >
                    <Skeleton active />
                    <br />
                    <Skeleton active />
                  </div>
                );
              })}
          {courses?.length > 0 &&
            !loading &&
            courses.map((course, index) => {
              return <CourseItem key={course?.id || index} {...course} />;
            })}

          {/* <div className="courses__list-item">
            <div className="img">
              <Link to={PATHS.COURSE.DETAIL}>
                <img
                  src="https://cfdcircle.vn/files/thumbnails/ahvVmtDlrzUPhKLDrc4YkdA8iFbACauYCN76TSGs.jpg"
                  alt="Khóa học CFD"
                  className="course__thumbnail"
                />
                <span className="course__img-badge badge">
                  Offline | Online
                </span>
              </Link>
            </div>
            <div className="content">
              <p className="label">Front-End</p>
              <h3 className="title --t3">
                <Link to={PATHS.COURSE.DETAIL}>Frontend Newbie</Link>
              </h3>
              <div className="content__info">
                <div className="user">
                  <div className="user__img">
                    <img src="img/avatar_nghia.jpg" alt="Avatar teacher" />
                  </div>
                  <p className="user__name">Trần Nghĩa</p>
                </div>
                <div className="price">
                  <strong>4.500.000đ</strong>
                </div>
              </div>
              <div className="content__action">
                <Button link={PATHS.COURSE.ORDER}>Đăng ký ngay</Button>
                <Button link={PATHS.COURSE.DETAIL} variant="default">
                  <img src="img/icon-paper.svg" alt="icon paper" />
                </Button>
              </div>
            </div>
          </div>
          <div className="courses__list-item">
            <div className="img">
              <a to={PATHS.COURSE.DETAIL}>
                <img
                  src="https://cfdcircle.vn/files/thumbnails/9VVXxGDc4ujKCegv4zcejuxJ4gC8C1qeXnECvy7s.jpg"
                  alt="Khóa học CFD"
                  className="course__thumbnail"
                />
                <span className="course__img-badge badge">
                  Offline | Online
                </span>
              </a>
            </div>
            <div className="content">
              <p className="label">Front-End</p>
              <h3 className="title --t3">
                <a href="https://cfdcircle.vn/files/thumbnails/9VVXxGDc4ujKCegv4zcejuxJ4gC8C1qeXnECvy7s.jpg">
                  Web Responsive
                </a>
              </h3>
              <div className="content__info">
                <div className="user">
                  <div className="user__img">
                    <img src="img/avatar_nghia.jpg" alt="Avatar teacher" />
                  </div>
                  <p className="user__name">Trần Nghĩa</p>
                </div>
                <div className="price">
                  <strong>4.900.000đ</strong>
                </div>
              </div>
              <div className="content__action">
                <Button link={PATHS.COURSE.ORDER}>Đăng ký ngay</Button>
                <Button link={PATHS.COURSE.DETAIL} variant="default">
                  <img src="img/icon-paper.svg" alt="icon paper" />
                </Button>
              </div>
            </div>
          </div>
          <div className="courses__list-item">
            <div className="img">
              <Link to={PATHS.COURSE.DETAIL}>
                <img
                  src="https://cfdcircle.vn/files/thumbnails/JUVoVxn36lQtCl20hHoEPMo8JJENBX5qXfI1U13k.jpg"
                  alt="Khóa học CFD"
                  className="course__thumbnail"
                />
                <span className="course__img-badge badge">
                  Offline | Online
                </span>
              </Link>
            </div>
            <div className="content">
              <p className="label">Front-End</p>
              <h3 className="title --t3">
                <a href="#">Frontend Master</a>
              </h3>
              <div className="content__info">
                <div className="user">
                  <div className="user__img">
                    <img src="img/avatar_nghia.jpg" alt="Avatar teacher" />
                  </div>
                  <p className="user__name">Trần Nghĩa</p>
                </div>
                <div className="price">
                  <strong>14.700.000đ</strong>
                </div>
              </div>
              <div className="content__action">
                <Button link={PATHS.COURSE.ORDER}>Đăng ký ngay</Button>
                <Button link={PATHS.COURSE.DETAIL} variant="default">
                  <img src="img/icon-paper.svg" alt="icon paper" />
                </Button>
              </div>
            </div>
          </div>
          <div className="courses__list-item">
            <div className="img">
              <Link to={PATHS.COURSE.DETAIL}>
                <img
                  src="https://cfdcircle.vn/files/thumbnails/ZUTudJyluuW4DGhZ6iXS2z6jRnEe7RnKTKhDTR6h.jpg"
                  alt="Khóa học CFD"
                  className="course__thumbnail"
                />
                <span className="course__img-badge badge">
                  Offline | Online
                </span>
              </Link>
            </div>
            <div className="content">
              <p className="label">Front-End</p>
              <h3 className="title --t3">
                <Link to={PATHS.COURSE.DETAIL}>ReactJS Master</Link>
              </h3>
              <div className="content__info">
                <div className="user">
                  <div className="user__img">
                    <img src="img/avatar_nghia.jpg" alt="Avatar teacher" />
                  </div>
                  <p className="user__name">Trần Nghĩa</p>
                </div>
                <div className="price">
                  <strong>6.000.000đ</strong>
                </div>
              </div>
              <div className="content__action">
                <Button link={PATHS.COURSE.ORDER}>Đăng ký ngay</Button>
                <Button link={PATHS.COURSE.DETAIL} variant="default">
                  <img src="img/icon-paper.svg" alt="icon paper" />
                </Button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </main>
  );
};
export default CoursesPage;
