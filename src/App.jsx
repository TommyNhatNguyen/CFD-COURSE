import { BrowserRouter, Route, Routes } from "react-router-dom";
import PATHS from "./constants/paths";
import MainLayout from "./layouts/MainLayout";
// import HomePage from "./pages/HomePage";
// import CoursesPage from "./pages/CoursesPage";
// import CourseOrderPage from "./pages/CourseOrderPage";
// import BlogPage from "./pages/BlogPage";
// import StudentProfilePage from "./pages/StudentProfilePage";
// import PaymentMethodPage from "./pages/PaymentMethodPage";
// import ContactPage from "./pages/ContactPage";
// import PrivacyPage from "./pages/PrivacyPage";
// import NotFoundPage from "./pages/NotFoundPage";
// import AboutPage from "./pages/AboutPage";
// import MyInfo from "./pages/StudentProfilePage/components/MyInfo";
// import MyCourse from "./pages/StudentProfilePage/components/MyCourse";
// import MyPayment from "./pages/StudentProfilePage/components/MyPayment";
// import CourseDetailPage from "./pages/CourseDetailPage";
// import BlogDetailPage from "./pages/BlogDetailPage";
// import PrivateRoute from "./components/PrivateRoute";
import { Suspense, lazy } from "react";
import PageLoading from "./components/PageLoading";

// const MainLayout = lazy(() => import("./layouts/MainLayout"));
const HomePage = lazy(() => import("./pages/HomePage"));
const CoursesPage = lazy(() => import("./pages/CoursesPage"));
const CourseOrderPage = lazy(() => import("./pages/CourseOrderPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const StudentProfilePage = lazy(() => import("./pages/StudentProfilePage"));
const PaymentMethodPage = lazy(() => import("./pages/PaymentMethodPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const CourseDetailPage = lazy(() => import("./pages/CourseDetailPage"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));
const MyInfo = lazy(() =>
  import("./pages/StudentProfilePage/components/MyInfo")
);
const MyCourse = lazy(() =>
  import("./pages/StudentProfilePage/components/MyCourse")
);
const MyPayment = lazy(() =>
  import("./pages/StudentProfilePage/components/MyPayment")
);

function App() {
  return (
    <Suspense fallback={<PageLoading />}>
      <BrowserRouter>
        <Routes>
          <Route path={PATHS.HOME} element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path={PATHS.COURSE.INDEX} element={<CoursesPage />} />
            <Route path={PATHS.BLOG.INDEX} element={<BlogPage />} />
            <Route element={<PrivateRoute redirectPath={PATHS.HOME} />}>
              <Route path={PATHS.COURSE.ORDER} element={<CourseOrderPage />} />
              <Route
                path={PATHS.PROFILE.INDEX}
                element={<StudentProfilePage />}
              >
                <Route index element={<MyInfo />} />
                <Route path={PATHS.PROFILE.MY_COURSE} element={<MyCourse />} />
                <Route
                  path={PATHS.PROFILE.MY_PAYMENT}
                  element={<MyPayment />}
                />
              </Route>
            </Route>
            <Route path={PATHS.PAYMENT} element={<PaymentMethodPage />} />
            <Route path={PATHS.CONTACT} element={<ContactPage />} />
            <Route path={PATHS.ABOUT} element={<AboutPage />} />
            <Route path={PATHS.PRIVACY} element={<PrivacyPage />} />
            <Route path={PATHS.COURSE.DETAIL} element={<CourseDetailPage />} />
            <Route path={PATHS.BLOG.DETAIL} element={<BlogDetailPage />} />
            {/* Error */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      //{" "}
    </Suspense>
  );
}

export default App;
