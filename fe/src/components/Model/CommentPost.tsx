import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { CommentPostSchema } from "../../types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import NotificationSkeleton from "../Skeleton/Notification";

interface CommentModalProps {
  onClose: () => void;
}

type CommentPostParams = z.infer<typeof CommentPostSchema>;

const CommentPostModal: React.FC<CommentModalProps> = ({ onClose }) => {
  const token = localStorage.getItem("token");
  const [comments, setComments] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [commentloading, setCommentLoading] = useState(true);

  const theme = useSelector((state: any) => {
    return state.theme.dark;
  });

  const user = useSelector((state: any) => {
    return state.user;
  });

  const postInfo = useSelector((state: any) => {
    console.log("at comment model", state.postInfo.id);
    return state.postInfo;
  });

  const {
    register,
    handleSubmit,
    reset,
    // watch,
    // formState: { errors },
  } = useForm<CommentPostParams>({ resolver: zodResolver(CommentPostSchema) });

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(
          `https://socialsync-xmk6.onrender.com/api/posts/${postInfo.id}/comments`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        )
        .then((res) => {
          // console.log("comments here",res.data)
          setComments(res.data);
          setCommentLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetch();
  }, [user]);

  const onSubmit: SubmitHandler<CommentPostParams> = async (data, e) => {
    e?.preventDefault();
    // console.log("comment on enter",data.comment)
    setLoading(true);
    axios
      .post(
        `https://socialsync-xmk6.onrender.com/api/posts/${postInfo.id}/comments`,
        data,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((res) => {
        console.log("Ack state", res.data);
        toast.success("Success", { theme: theme ? "dark" : "light" });
        const addComment = [res.data];
        setComments((prevComments: any) => [...addComment, ...prevComments]);
        const socket = io("https://socialsync-xmk6.onrender.com");
        console.log(socket);
        const receiver: string = postInfo.userName;
        const notify: string = `${user.userName} commented on your post`;
        socket?.emit("sendNotification", { user, receiver, notify });
        reset();
        // onClose()
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message, { theme: theme ? "dark" : "light" });
      })
      .finally(() => setLoading(false));
  };

  const handleClick = (state: string) => {
    if (state == "close") {
      onClose();
    }
  };

  const handleCommentDelete = (idx: number, id: string) => {
    axios
      .delete(`https://socialsync-xmk6.onrender.com/api/posts/${id}/comments`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        console.log("Ack state", res.data);
        // toast.success("Success",{theme:theme?"dark":"light"})
        const newComments = comments.filter(
          (_: any, index: number) => index !== idx
        );
        setComments(newComments);
        // onClose()
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message, { theme: theme ? "dark" : "light" });
      });
  };

  const onError = (e: any) => {
    console.log(e);
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 min-h-screen w-full z-[100] flex justify-center items-center bg-black bg-opacity-80"
        onClick={() => handleClick("close")}
      ></div>

      <div
        className={`fixed left-0 top-0 sm:top-[20%] sm:left-[20%] lg:left-[30%]  shadow-2xl w-full sm:w-[60%] lg:w-[45%] z-[105] rounded-lg ${
          theme ? "shadow-[#3f3f3f]" : "shadow-[#3b3b3b]"
        }`}
      >
        <form
          className={` ${
            theme
              ? "border-[#575757] bg-[#3d3d3d]"
              : "bg-[#f3f2f2] border-[#8b8b8b]"
          } flex flex-col gap-5 rounded-lg h-full`}
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div
            className={` ${
              theme ? "text-[#c4c3c3]" : "text-[#727272]"
            } h-full shadow-md shadow-black p-2`}
          >
            <div className="h-full">
              <section className=" relative">
                <div className="">
                  <div className="flex px-3">
                    <img
                      src={postInfo.url}
                      className={`w-10 h-10 mr-2 rounded-full`}
                    />
                    <div>
                      <p className={`text-md w-full text-left rounded-md`}>
                        {postInfo.userName}
                      </p>
                      <p className="text-[10px]">{postInfo.date}</p>
                    </div>
                  </div>
                </div>

                <div
                  className={`overflow-y-auto h-80 w-full my-3 px-4 scrollbar-thin ${
                    theme
                      ? "scrollbar-thumb-[#aa77f0] scrollbar-track-[#3d3d3d]"
                      : "scrollbar-thumb-[#aa77f0] scrollbar-track-[#f3f2f2]"
                  }   overflow-x-hidden`}
                >
                  <div className="py-2 text-left w-full">
                    <p>{postInfo.content}</p>
                  </div>
                  <div className="w-full flex justify-center">
                    {postInfo.photo != "" ? (
                      <img src={postInfo.photo} className="w-full" />
                    ) : (
                      <></>
                    )}
                  </div>
                  <div
                    className={`h-[0.8px] w-full ${
                      theme ? "bg-[#737373]" : "bg-[#b6b5b5]"
                    } my-3`}
                  ></div>
                  <div className="text-left w-full">
                    {!commentloading ? (
                      <>
                        {comments.length === 0 ? (
                          <>Be the first one to comment</>
                        ) : (
                          <>
                            {comments.map((comment: any, idx: number) => {
                              return (
                                <div key={idx}>
                                  <div
                                    className={`w-full py-2 flex justify-between items-center px-1 rounded-md ${
                                      theme
                                        ? "hover:bg-[#666666]"
                                        : "hover:bg-black hover:bg-opacity-10"
                                    } group`}
                                  >
                                    <p>
                                      <img
                                        src={comment.userId.url}
                                        className={`w-8 h-8 mr-2 rounded-full inline-block`}
                                      />
                                      <span
                                        className={` px-3 py-2 rounded-2xl`}
                                      >
                                        {comment.comment}
                                      </span>
                                    </p>
                                    {user.userName ===
                                    comment.userId.userName ? (
                                      <button
                                        className={`${
                                          theme
                                            ? "text-white"
                                            : "text-[#232323]"
                                        }text-md items-center hidden group-hover:block`}
                                        onClick={() =>
                                          handleCommentDelete(idx, comment._id)
                                        }
                                      >
                                        <i className="fa-solid fa-trash-arrow-up px-2"></i>
                                      </button>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <NotificationSkeleton />
                      </>
                    )}
                  </div>
                </div>

                <div
                  className={`h-[0.8px] ${
                    theme ? "bg-[#555555]" : "bg-[#d1d0d0]"
                  } mt-2`}
                ></div>

                <div className="flex gap-4 justify-between items-center py-2 px-3 w-full  shadow-2xl shadow-black">
                  <img src={user.url} className="h-10 w-10 rounded-full" />
                  <input
                    type="text"
                    placeholder="Comment"
                    {...register("comment")}
                    className={`${
                      theme
                        ? "text-[#c4c3c3] bg-transparent border-2 border-[#555555]"
                        : "text-[#555555] border-2 border-[#a9a8a8]"
                    } w-full focus:outline-none focus:border-[#aa77f0] p-2`}
                  />
                  <button
                    type="submit"
                    className={`text-3xl ${
                      theme ? " text-[#e0e0e0]" : " text-[#7e7e7e]"
                    } `}
                    disabled={loading}
                  >
                    <i className="fa-solid fa-circle-chevron-right"></i>
                  </button>
                </div>
              </section>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CommentPostModal;
