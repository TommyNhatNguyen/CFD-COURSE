import { Empty } from "antd";
import React, { useState } from "react";
import { StyledAccordion } from "../StyledComponents/StyledAccordion";

const Accordion = ({ label = "", data = [], defaultActiveIndex = -1 }) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  return (
    <StyledAccordion className="accordion">
      {!!label && <h3 className="accordion__title label">{label}</h3>}
      {data?.length > 0 ? (
        data.map((item, index) => {
          const { id, title, content } = item || {};
          let modContent;
          if (Array.isArray(content)) {
            modContent = content?.join("\r\n");
            console.log("modContent", modContent);
          } else {
            modContent = content?.trim();
          }
          return (
            <div
              key={id || index}
              id={id || index}
              className={`accordion__content ${
                index === activeIndex ? "active" : ""
              }`}
            >
              <div
                className="accordion__content-title"
                onClick={() =>
                  setActiveIndex(index === activeIndex ? -1 : index)
                }
              >
                <h4>
                  <strong>{title || ""}</strong>
                </h4>
              </div>
              <div className="accordion__content-text">
                {modContent?.length > 0
                  ? modContent
                  : "Nội dung chưa được cập nhật"}
              </div>
            </div>
          );
        })
      ) : (
        <Empty
          description="Không có nội dung hiển thị"
          style={{ margin: "0 auto" }}
        />
      )}
    </StyledAccordion>
  );
};

export default Accordion;
