import React, { useEffect, useState } from "react";
import useQuery from "../../hooks/useQuery";
import blogService from "../../services/blogService";
import useMutation from "../../hooks/useMutation";
import { Empty, Skeleton, Space } from "antd";
import PATHS from "../../constants/paths";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/format";
import useDebounce from "../../hooks/useDebounce";

const BlogPage = () => {
  const [blogs, setBlogs] = useState();
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { data: blogData, loading: blogLoading } = useQuery(
    blogService.getBlogs
  );
  const { data: blogCategoriesData, loading: blogCategoriesLoading } = useQuery(
    blogService.getBlogCategoires
  );
  const blogsAll = blogData?.blogs || [];
  const blogCategories = blogCategoriesData?.blogs || [];
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(blogs?.length / ITEMS_PER_PAGE) || 0;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentBlogs = blogs?.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const loading = blogLoading || blogCategoriesLoading;
  const apiLoading = useDebounce(loading, 500);
  // First render show all posts
  useEffect(() => {
    setBlogs(blogsAll);
  }, [blogData]);
  // Handle get blog by category
  const handleGetBlogByCategory = function (e) {
    e.preventDefault();
    setSelectedCategoryId(e.target.id);
    if (e.target.id !== "all") {
      setBlogs(blogsAll?.filter((blog) => blog?.category?.id === e.target.id));
    } else {
      setBlogs(blogsAll);
    }
  };
  // Handle page change
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <main className="mainwrapper blog --ptop">
      <div className="container">
        <div className="textbox">
          <div className="container">
            <h2 className="title --t2">Blog</h2>
          </div>
        </div>
        <div className="blog__menu">
          <a
            id="all"
            href="#"
            className={`blog__menu-item ${
              selectedCategoryId === "all" ? "active" : ""
            }`}
            onClick={handleGetBlogByCategory}
          >
            Tất cả
          </a>
          {blogCategories?.length > 0 &&
            blogCategories?.map((category, index) => {
              return (
                <a
                  key={category?.id || index}
                  href="#"
                  id={category?.id || index}
                  className={`blog__menu-item ${
                    selectedCategoryId === category?.id ? "active" : ""
                  }`}
                  onClick={handleGetBlogByCategory}
                >
                  {category?.name || ""}
                </a>
              );
            })}
        </div>
        <div className="blog__list">
          {apiLoading &&
            Array(ITEMS_PER_PAGE)
              .fill("")
              .map((_, index) => (
                <div className="blog__list-item">
                  <div className="img">
                    <a>
                      <Skeleton.Image
                        active
                        className="course__thumbnail"
                        style={{
                          maxWidth: "100%",
                          minWidth: "100%",
                          minHeight: "100%",
                          objectFit: "cover",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%,-50%)",
                          WebkitTransform: "translate(-50%,-50%)",
                        }}
                      />
                    </a>
                  </div>
                  <div className="content">
                    <Skeleton active />
                  </div>
                </div>
              ))}
          {!apiLoading &&
            currentBlogs?.length > 0 &&
            currentBlogs?.map((blog, index) => {
              return (
                <div key={blog?.id || index} className="blog__list-item">
                  <div className="img">
                    <Link to={`${PATHS.BLOG.INDEX}/${blog?.slug || ""}`}>
                      <img
                        src={blog?.image || "/img/default-image.jpg"}
                        alt="Khóa học CFD"
                        className="course__thumbnail"
                      />
                    </Link>
                  </div>
                  <div className="content">
                    <p className="label">{blog?.category?.name || ""}</p>
                    <h2 className="title --t3">
                      <Link to={`${PATHS.BLOG.INDEX}/${blog?.slug || ""}`}>
                        {blog?.name || ""}
                      </Link>
                    </h2>
                    <div className="content__info">
                      <div className="user">
                        <div className="user__img">
                          <img
                            src="/img/default-user-icon.jpg"
                            alt="Avatar teacher"
                          />
                        </div>
                        <p className="user__name">{blog?.author || ""}</p>
                      </div>
                      <div className="date">{formatDate(blog?.createdAt)}</div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <ul className="paging">
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
            >
              <i>
                <img src="/img/iconprev.svg" alt="icon" />
              </i>
            </a>
          </li>
          {totalPages > 0 &&
            Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (page, index) => {
                return (
                  <li key={page || index}>
                    <a
                      className={page === currentPage ? "active" : ""}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page);
                      }}
                    >
                      {page}
                    </a>
                  </li>
                );
              }
            )}

          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
            >
              <i>
                <img src="/img/iconprev.svg" alt="icon" />
              </i>
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default BlogPage;
