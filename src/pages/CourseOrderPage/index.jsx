import React, { useEffect, useRef, useState } from "react";
import InfoOrder from "./components/InfoOrder";
import FormOrder from "./components/FormOrder";
import PaymentOrder from "./components/PaymentOrder";
import { useNavigate, useParams } from "react-router-dom";
import courseService from "../../services/courseService";
import useQuery from "../../hooks/useQuery";
import { formatCurrency, formatDate } from "../../utils/format";
import { ROLES } from "../../constants/role";
import { useAuthContext } from "../../context/AuthContext";
import useMutation from "../../hooks/useMutation";
import orderService from "../../services/orderService";
import PATHS from "../../constants/paths";
import Button from "../../components/Button";

const CourseOrderPage = () => {
  // Get course slug
  const { courseSlug } = useParams();
  // Call API get data
  const { data: courseDetailData, loading: courseDetailLoading } = useQuery(
    () => courseService.getCourseBySlug(`/${courseSlug}`)
  );
  // Modified pass props
  const { startDate, tags, teams, price } = courseDetailData;
  const modifiedCourseDetailData = {
    ...courseDetailData,
    startDate: formatDate(startDate),
    price: formatCurrency(price),
    tags: tags?.join(" | "),
    teacherInfo: teams?.find((team) => team?.tags?.includes(ROLES.teacher)),
  };
  // ---- Start: FormOrder
  // const [form, setForm] = useState({
  //   name: "",
  //   email: "",
  //   phone: "",
  //   type: "",
  // });
  // const [error, setError] = useState({});

  // const register = (registerName) => {
  //   return {
  //     name: registerName,
  //     value: form[registerName],
  //     error: error[registerName],
  //     onChange: (e) => {
  //       setForm((prev) => {
  //         return {
  //           ...prev,
  //           [registerName]: e.target.value,
  //         };
  //       });
  //     },
  //   };
  // };

  const {
    handleGetProfileCourse,
    handleGetProfilePayment,
    messageAPI,
    courseInfo,
  } = useAuthContext();
  // const {
  //   firstName: profileName,
  //   email: profileEmail,
  //   phone: profilePhone,
  // } = profile || {};

  // useEffect(() => {
  //   setForm({
  //     name: profileName || "",
  //     email: profileEmail || "",
  //     phone: profilePhone || "",
  //     type: "",
  //   });
  // }, [profileName, profileEmail, profilePhone]);

  // const _onFormOrderSubmit = () => {
  //   // start validate OrderForm
  //   const errorObject = {};

  //   if (!!!form.name) {
  //     errorObject.name = "Vui lòng nhập tên";
  //   }

  //   if (!!!form.email) {
  //     errorObject.email = "Vui lòng nhập email";
  //   } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
  //     errorObject.email = "Vui lòng nhập đúng định dạng email";
  //   }

  //   if (!!!form.phone) {
  //     errorObject.phone = "Vui lòng nhập phone";
  //   } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(form.phone)) {
  //     errorObject.phone = "Vui lòng nhập đúng định dạng phone";
  //   }

  //   if (!!!form.type) {
  //     errorObject.type = "Vui lòng chọn phương thức học";
  //   }

  //   setError(errorObject);
  //   // end validate

  //   if (Object.keys(errorObject).length > 0) {
  //     console.log("Profile form validate failed", errorObject);
  //     return null;
  //   } else {
  //     console.log("Profile form validate success", form);
  //     return form;
  //   }
  // };
  // ---- End: FormOrder
  const formRef = useRef(null);
  // ---- Start: Payment Method
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const { loading: orderLoading, execute: orderCourse } = useMutation(
    orderService.orderCourse
  );

  const handlePaymentMethodChange = (payment) => {
    setPaymentMethod(payment);
  };
  // Handle order course
  const _onOrder = () => {
    const profileData = formRef?.current?.onSubmit?.();
    console.log("profileData", profileData);
    if (!profileData) return;
    if (paymentMethod) {
      const payload = {
        name: profileData?.name,
        email: profileData?.email,
        phone: profileData?.phone,
        type: profileData?.type,
        course: courseDetailData?.id,
        paymentMethod,
      };
      orderCourse(payload, {
        onSuccess: async () => {
          messageAPI.success("Đăng ký thành công");
          await handleGetProfileCourse();
          await handleGetProfilePayment();
          navigate(PATHS.PROFILE.MY_COURSE);
        },
        onFail: () => {
          messageAPI.error("Đăng ký thất bại");
        },
      });
    } else {
      messageAPI.error("Vui lòng chọn hình thức thanh toán");
    }
  };
  const alreadyOrderInfo = courseInfo?.find(
    (item) => item?.course?.slug === courseSlug
  );
  const isAlreadyOrdered = !!alreadyOrderInfo;
  useEffect(() => {
    if (alreadyOrderInfo) {
      setPaymentMethod(alreadyOrderInfo?.paymentMethod || "");
      formRef?.current?.updateForm?.({
        phone: alreadyOrderInfo?.phone || "",
        type: alreadyOrderInfo?.type || "",
      });
      // setForm((prev) => ({
      //   ...prev,
      //   phone: alreadyOrderInfo?.phone || "",
      //   type: alreadyOrderInfo?.type || "",
      // }));
    }
  }, [JSON.stringify(alreadyOrderInfo)]);
  // ---- End: Payment Method

  return (
    <main className="mainwrapper --ptop">
      <section className="sccourseorder">
        <div className="container small">
          <InfoOrder course={modifiedCourseDetailData} />
          <FormOrder
            types={tags}
            // register={register}
            // {...profileData}
            disabled={isAlreadyOrdered}
            ref={formRef}
          />
          <PaymentOrder
            handleChange={handlePaymentMethodChange}
            selectedPayment={paymentMethod}
            disabled={isAlreadyOrdered}
          />
          {/* addclass --processing khi bấm đăng ký */}
          <Button
            disabled={isAlreadyOrdered}
            loading={orderLoading}
            onClick={_onOrder}
            style={{ width: "100%" }}
          >
            <span>{isAlreadyOrdered ? "Đã đăng ký" : "Đăng ký khoá học"}</span>
            {/* <svg
              version="1.1"
              id="L9"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              enableBackground="new 0 0 0 0"
              xmlSpace="preserve"
            >
              <path
                fill="#fff"
                d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
              >
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  dur="1s"
                  from="0 50 50"
                  to="360 50 50"
                  repeatCount="indefinite"
                />
              </path>
            </svg> */}
          </Button>
        </div>
      </section>
    </main>
  );
};

export default CourseOrderPage;
