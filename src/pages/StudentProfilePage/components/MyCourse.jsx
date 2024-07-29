import React, { useEffect, useState } from "react";
import PATHS from "../../../constants/paths";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import CourseItem from "../../../components/CourseItem.jsx";
import { COURSE_ITEM_TYPE } from "../../../constants/general";
import { Skeleton } from "antd";

const MyCourse = () => {
  const { courseInfo } = useAuthContext();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      <div className="courses__list">
        {loading &&
          Array(2)
            .fill("")
            .map((_, index) => {
              return (
                <div key={index} className="courses__list-item">
                  <Skeleton active />
                  <br />
                  <br />
                  <Skeleton active />
                </div>
              );
            })}
        {!loading &&
          courseInfo &&
          courseInfo?.map((item, index) => {
            return (
              <CourseItem
                key={item?.id || index}
                {...item?.course}
                type={COURSE_ITEM_TYPE.order}
              />
            );
          })}
      </div>
    </div>
  );
};

export default MyCourse;
