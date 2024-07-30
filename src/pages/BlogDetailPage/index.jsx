import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import blogService from "../../services/blogService";
import { formatDate } from "../../utils/format";
import { Empty } from "antd";
import PATHS from "../../constants/paths";
import useMutation from "../../hooks/useMutation";

const BlogDetailPage = () => {
  // Get detail blog
  const { blogSlug } = useParams();
  const { data: blogDetailData, execute: getBlogDetail } = useMutation(
    blogService.getBlogsBySlug
  );
  const blogDetail = blogDetailData || {};
  console.log("blogDetail", blogDetail);
  const { category, createdAt } = blogDetail;
  const modifiedBlogDetail = {
    ...blogDetail,
    categoryTitle: category?.name || "",
    createdAt: formatDate(createdAt),
  };
  useEffect(() => {
    if (blogSlug) getBlogDetail(`/${blogSlug}` || "", {});
  }, [blogSlug]);
  // Get all blogs
  const { data: blogsData } = useQuery(blogService.getBlogs);
  const blogsAll = blogsData?.blogs || [];

  return (
    <main className="mainwrapper blogdetail --ptop">
      <div className="container">
        <div className="wrapper">
          <div className="blogdetail__title">
            <h1 className="title --t2">{modifiedBlogDetail?.name || ""}</h1>
            <ul className="meta">
              <li className="meta__item">
                Đăng bởi {modifiedBlogDetail?.author || ""}
              </li>
              <li className="meta__item">
                {modifiedBlogDetail?.categoryTitle || ""}
              </li>
              <li className="meta__item">
                {modifiedBlogDetail?.createdAt || ""}
              </li>
            </ul>
          </div>
          <div className="blogdetail__content">
            <img
              src={modifiedBlogDetail?.image || "/img/default-image.jpg"}
              alt="Post thumnail"
            />
            <div
              className="blogdetail__content-entry"
              dangerouslySetInnerHTML={{
                __html: modifiedBlogDetail?.description || "",
              }}
            ></div>
            <div className="blogdetail__line" />
            <div className="blogdetail__content-social btngroup">
              <a href="#" className="btn btn-fb">
                <img src="/img/icon-fb-share.svg" alt="facebook icon" />
                <span>Share</span>
              </a>
              <a href="#" className="btn btn-linkedin">
                <img src="/img/icon-in-share.svg" alt="facebook icon" />
                <span>Share</span>
              </a>
            </div>
          </div>
        </div>
        <div className="blogdetail__related">
          <h2 className="blogdetail__related-title title --t2">
            Bài viết liên quan
          </h2>
          <div className="blog__list">
            {blogsAll?.length > 0 ? (
              blogsAll
                ?.filter((item) => item?.slug !== blogSlug)
                .map((item, index) => {
                  return (
                    <div key={item?.id || index} className="blog__list-item">
                      <div className="img">
                        <Link to={`${PATHS.BLOG.INDEX}/${item?.slug || ""}`}>
                          <img
                            src={item?.image || "/img/default-image.jpg"}
                            alt="Khóa học CFD"
                            className="course__thumbnail"
                          />
                        </Link>
                      </div>
                      <div className="content">
                        <p className="label">{item?.category?.name || ""}</p>
                        <h2 className="title --t3">
                          <Link to={`${PATHS.BLOG.INDEX}/${item?.slug || ""}`}>
                            {item?.name || ""}
                          </Link>
                        </h2>
                        <div className="content__info">
                          <div className="user">
                            <div className="user__img">
                              <img
                                src={
                                  item?.image || "/img/default-user-icon.jpg"
                                }
                                alt="Avatar teacher"
                              />
                            </div>
                            <p className="user__name">{item?.author || ""}</p>
                          </div>
                          <div className="date">
                            {formatDate(item?.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
            ) : (
              <Empty description="Không tìm thấy bài viết nào" />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogDetailPage;
