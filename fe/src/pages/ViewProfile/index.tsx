import { useSelector } from "react-redux";
import bgimg from "../../assets/bio_bg.png";
import Posts from "../../components/Post";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostSkeleton from "../../components/Skeleton/Post";
import ProfileSkeleton from "../../components/Skeleton/Profile";
import { toast } from "react-toastify";

const ViewProfile = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [field, setField] = useState("posts");
  const [flag, setFlag] = useState(true);
  const [sentRequest, setSentRequest] = useState<any>([]);
  const [fetchSentRequest, setFetchSentRequest] = useState(false);

  const theme = useSelector((state: any) => {
    return state.theme.dark;
  });

  const user = useSelector((state: any) => {
    console.log("user", state.user.friends);
    return state.user;
  });

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(`https://socialsync-xmk6.onrender.com/api/user/${id}/profile`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((res) => {
          // console.log("postsdata",res.data)
          setPosts(res.data);
          if (Array.isArray(res.data)) {
            setFlag(true);
          } else {
            setFlag(false);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetch();
  }, [user]);

  useEffect(() => {
    const fetch = async () => {
      axios
        .get(`https://socialsync-xmk6.onrender.com/api/user/sent-request`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((res) => {
          // console.log("sent request",res.data)
          setSentRequest(res.data);
          setFetchSentRequest(false);
        })
        .catch((err) => toast.error(err.message));
    };
    fetch();
  }, [user, fetchSentRequest]);

  const handleRequest = async (requestTo: string) => {
    const request = { requestFrom: user._id, requestTo: requestTo };
    await axios
      .post(
        `https://socialsync-xmk6.onrender.com/api/friend-request`,
        request,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setFetchSentRequest(true);
        toast.success("Request successfully sent sent", {
          theme: theme ? "dark" : "light",
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Friend request already sent", {
          theme: theme ? "dark" : "light",
        });
      });
  };

  return (
    <div className="pt-28 sm:pt-16 text-white px:3 min-h-screen w-full">
      <div
        className={`h-[12rem] w-full pl-[5%] hidden lg:block ${
          theme ? "bg-[#1a1919]" : "bg-[#e9ebee]"
        }`}
      >
        <img src={bgimg} className={`w-[90%] h-[16rem] lg:fixed `} />
      </div>
      {/* {!loading? */}
      <div className="h-full w-full px-[5%] flex flex-col lg:flex-row">
        {/* USER INFO */}
        {!loading ? (
          <>
            {flag ? (
              <div className="w-full lg:w-[20%] flex lg:flex-col items-center justify-center lg:fixed">
                <img
                  src={posts[0].userId.url}
                  className={`w-32 h-32 rounded-full border-2`}
                />

                <div
                  className={`w-full flex flex-col lg:items-center p-5 ${
                    theme ? "text-[#c0bfbf]" : "text-[#474747]"
                  }`}
                >
                  <p className="text-2xl">{posts[0].userId.userName}</p>
                  <p
                    className={`text-md ${
                      theme ? "text-[#c0bfbf]" : "text-[#797878]"
                    }  mb-[6px]`}
                  >
                    {posts[0].userId.email}
                  </p>
                  <div className="pt-7 w-full flex flex-col lg:items-center">
                    <p className="mb-2 text-start">📹 {posts.length} Posts</p>
                    <p className="text-start">
                      🤷‍♂️{posts[0].userId.friends.length} Friends
                    </p>
                  </div>
                  <div>
                    {posts[0].userId._id !== user._id ? (
                      <button
                        className="mt-3 last:font-semibold px-4 py-1 rounded-md flex items-center space-x-2 transform-gpu transition-all duration-200 border-[1px] border-[#aa77f0] hover:bg-purple-400 active:scale-90 w-full"
                        disabled={user.friends.includes(posts[0].userId._id)}
                        onClick={() => handleRequest(posts[0].userId._id)}
                      >
                        <span className={`${theme ? "hover:text-white" : ""}`}>
                          {user.friends.includes(String(posts[0].userId._id))
                            ? "Friends"
                            : `${
                                sentRequest.includes(
                                  String(posts[0].userId._id)
                                )
                                  ? "Request Sent"
                                  : "Add Friend"
                              }`}
                        </span>
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full lg:w-[20%] flex lg:flex-col items-center justify-center lg:fixed">
                <img
                  src={posts.url}
                  className={`w-32 h-32 rounded-full border-2`}
                />

                <div
                  className={`w-full flex flex-col lg:items-center p-5 ${
                    theme ? "text-[#c0bfbf]" : "text-[#474747]"
                  }`}
                >
                  <p className="text-2xl">{posts.userName}</p>
                  <p
                    className={`text-md ${
                      theme ? "text-[#c0bfbf]" : "text-[#797878]"
                    }  mb-[6px]`}
                  >
                    {posts.email}
                  </p>
                  <div className="pt-7 w-full flex flex-col lg:items-center">
                    <p className="mb-2 text-start">📹 0 Posts</p>
                    <p className="text-start">
                      🤷‍♂️{posts.friends.length} Friends
                    </p>
                  </div>
                  <div>
                    {posts._id !== user._id ? (
                      <button
                        className="mt-3 font-semibold px-4 py-1 rounded-md flex items-center space-x-2 transform-gpu transition-all duration-200 border-[1px] border-[#aa77f0] hover:bg-purple-400 active:scale-90 w-full"
                        disabled={user.friends.includes(posts._id)}
                        onClick={() => handleRequest(posts._id)}
                      >
                        <span className={`${theme ? "hover:text-white" : ""}`}>
                          {user.friends.includes(String(posts._id))
                            ? "Friends"
                            : `${
                                sentRequest.includes(String(posts._id))
                                  ? "Request Sent"
                                  : "Add Friend"
                              }`}
                        </span>
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <ProfileSkeleton />
          </>
        )}

        {/* POSTS */}
        <div className={`lg:mt-[4rem] lg:ml-[25%] w-full bg-transparent`}>
          <h2
            className={`py-4 text-[1.1rem] ${
              theme ? "bg-[#1a1919]" : "bg-[#e9ebee]"
            } lg:fixed lg:w-full`}
          >
            <button
              className={`${
                field === "posts"
                  ? "text-[#aa77f0] underline underline-offset-8"
                  : ""
              } mr-4`}
            >
              <span
                className={`${theme ? "text-[#b8b7b7]" : "text-[#4b4b4b]"}`}
                onClick={() => setField("posts")}
              >
                Posts
              </span>
            </button>
            <button
              className={` ${
                field === "photos"
                  ? "text-[#aa77f0] underline underline-offset-8"
                  : ""
              }`}
            >
              <span
                className={`${theme ? "text-[#b8b7b7]" : "text-[#4b4b4b]"}`}
                onClick={() => setField("photos")}
              >
                Photos
              </span>
            </button>
          </h2>

          {!loading ? (
            <div className="flex flex-col items-center lg:mt-16">
              {field === "posts" ? (
                <>
                  <div className="w-[90%] md:w-[38rem]">
                    {!flag ? (
                      <div
                        className={`${
                          theme ? "text-[#b8b7b7]" : "text-[#4b4b4b]"
                        } text-center`}
                      >
                        No posts yet
                      </div>
                    ) : (
                      <>
                        {posts.map((post: any, idx: number) => {
                          return (
                            <div key={idx}>
                              <Posts post={post} />
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex  flex-wrap w-full">
                    {!flag ? (
                      <div
                        className={`${
                          theme ? "text-[#b8b7b7]" : "text-[#4b4b4b]"
                        } flex justify-center w-full`}
                      >
                        No photos yet
                      </div>
                    ) : (
                      <>
                        {posts.map((post: any, idx: number) => {
                          return (
                            <div key={idx}>
                              {post.photo ? (
                                <div
                                  key={idx}
                                  className="flex px-3 py-3 w-[16rem] h-[18rem]"
                                >
                                  <img
                                    src={post.photo}
                                    className="object-cover rounded-md"
                                  />
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="lg:mt-16">
              <PostSkeleton />
              <PostSkeleton />
            </div>
          )}
        </div>
      </div>
      {/* // :
            // <PostSkeleton/>
            // } */}
    </div>
  );
};

export default ViewProfile;
