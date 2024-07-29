import React, { useEffect, useMemo, useState } from "react";
import courseService from "../../services/courseService";
import useQuery from "../../hooks/useQuery";
import HeroSection from "./components/HeroSection";
import CourseComingSection from "./components/CourseComingSection";
import CoursesSection from "./components/CoursesSection";
import TeacherSection from "./components/TeacherSection";
import FeaturedSection from "./components/FeaturedSection";
import TestimonialSection from "./components/TestimonialSection";
import FaqSection from "./components/FaqSection";
import GallerySection from "./components/GallerySection";
import CallRegisterSection from "./components/CallRegisterSection";
import teamService from "../../services/teamService";
import questionService from "../../services/questionService";
import galleryService from "../../services/galleryService";
import CallToRegister from "../../components/CallToRegister";

const HomePage = () => {
  const { data: coursesData, loading: coursesLoading } = useQuery(
    courseService.getCourse
  );
  const courses = coursesData?.courses || [];
  const comingCourses =
    courses.filter((course) => {
      return course?.startDate && new Date(course.startDate) > new Date();
    }) || [];

  const { data: teamsData, loading: teamLoading } = useQuery(
    teamService.getTeam
  );
  const teams = teamsData?.teams || [];

  const { data: questionsData, loading: questionsLoading } = useQuery(
    questionService.getService
  );
  const questions = questionsData?.questions || [];
  // Gallery
  const { data: galleriesData, loading: galleriesLoading } = useQuery(
    galleryService.getGalleries
  );
  const galleries = galleriesData?.galleries?.[0]?.images || [];
  return (
    <main className="mainwrapper">
      <HeroSection />
      <CourseComingSection courses={comingCourses} loading={coursesLoading} />
      <CoursesSection courses={courses} loading={coursesLoading} />
      <TeacherSection teachers={teams} loading={teamLoading} />
      <FeaturedSection />
      {/* --------------------------------Testimonial-------------------------------- */}
      <TestimonialSection />
      {/* --------------------------------faq-------------------------------- */}
      <FaqSection questions={questions} loading={questionsLoading} />
      <GallerySection galleries={galleries} loading={galleriesLoading} />
      <CallToRegister />
    </main>
  );
};

export default HomePage;
