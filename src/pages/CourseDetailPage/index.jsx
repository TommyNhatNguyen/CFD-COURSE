import React, { useEffect, useMemo, useRef, useState } from "react";
import Button from "../../components/Button";
import HeaderTop from "./components/HeaderTop";
import HeroSection from "./components/HeroSection";
import ContentDetailSection from "./components/ContentDetailSection";
import FeaturedSection from "./components/FeaturedSection";
import FaqSection from "./components/FaqSection";
import CourseSection from "./components/CourseSection";
import useQuery from "../../hooks/useQuery";
import courseService from "../../services/courseService";
import questionService from "../../services/questionService";
import useMutation from "../../hooks/useMutation";
import { useParams } from "react-router-dom";
import { ROLES } from "../../constants/role";
import { formatCurrency, formatDate } from "../../utils/format";
import useDebounce from "../../hooks/useDebounce";
import { useAuthContext } from "../../context/AuthContext";
import PageLoading from "../../components/PageLoading";

const CourseDetailPage = () => {
  // Get params
  const { courseSlug } = useParams();
  const { courseInfo } = useAuthContext();
  const [isAlreadySignUp, setIsAlreadySignUp] = useState("");
  // Call API
  const { data: coursesData, loading: coursesLoading } = useQuery(
    courseService.getCourse
  );
  const { data: questionsData, loading: questionsLoading } = useQuery(
    questionService.getService
  );
  const {
    data: courseDetailData,
    loading: courseDetailLoading,
    execute,
  } = useMutation(courseService.getCourseBySlug);

  useEffect(() => {
    if (courseSlug) execute(`/${courseSlug}` || "", {});
    setIsAlreadySignUp(
      !!courseInfo?.find((item) => item?.course?.slug === courseSlug)
    );
  }, [courseSlug, courseInfo]);

  // Modified Data
  const courses = coursesData?.courses || [];
  const questions = questionsData?.questions || [];
  const orderLink = `/course-order/` + courseSlug;
  const { teams, startDate, price, tags } = courseDetailData || {};
  const modifiedCourses = useMemo(() => {
    return {
      ...courseDetailData,
      teacherInfo:
        teams?.find((item) => item?.tags.includes(ROLES.teacher)) || "",
      startDate: formatDate?.(startDate || ""),
      price: formatCurrency?.(price || ""),
      tags: tags?.join(" | "),
      orderLink,
    };
  }, [courseDetailData]);
  // Debounce
  const apiLoading = coursesLoading || questionsLoading || courseDetailLoading;
  const pageLoading = useDebounce(apiLoading, 500);
  if (pageLoading) {
    return <PageLoading />;
  }
  return (
    <>
      <HeaderTop {...modifiedCourses} isAlreadySignUp={isAlreadySignUp} />
      <main className="mainwrapper coursedetailpage">
        <HeroSection {...modifiedCourses} isAlreadySignUp={isAlreadySignUp} />
        <ContentDetailSection {...modifiedCourses} />
        <FeaturedSection />
        <FaqSection questions={questions} loading={questionsLoading} />
        <CourseSection
          courses={courses}
          loading={coursesLoading}
          slug={courseSlug}
        />
      </main>
    </>
  );
};
export default CourseDetailPage;
