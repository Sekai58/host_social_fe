import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FriendsSkeleton from "../../components/Skeleton/Friends";

const SearchUsers = () => {
  const token = localStorage.getItem("token");
  const [searchUsers, setSearchUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sentRequest, setSentRequest] = useState<any>([]);
  const [fetchRequest, setFetchRequest] = useState(false);

  const theme = useSelector((state: any) => {
    return state.theme.dark;
  });

  const user = useSelector((state: any) => {
    return state.user;
  });

  const query = useSelector((state: any) => {
    // console.log("query",state.query)
    return state.query;
  });

  useEffect(() => {
    const fetch = async () => {
      axios
        .get(`https://socialsync-xmk6.onrender.com/api/user/sent-request`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setSentRequest(res.data);
          setFetchRequest(false);
        })
        .catch((err) => toast.error(err.message));
    };
    fetch();
  }, [query, fetchRequest]);

  useEffect(() => {
    const fetch = async () => {
      axios
        .get(
          `https://socialsync-xmk6.onrender.com/api/user/search?name=${query}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setSearchUsers(res.data);
          setLoading(false);
        })
        .catch((err) => toast.error(err.message));
    };
    fetch();
  }, [query]);

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
        setFetchRequest(true);
        console.log(res.data);
        toast.success("Request successfully sent", {
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
    <div className="flex gap-4 flex-wrap pt-20 px-3 sm:px-10">
      <div className="pt-24 sm:pt-10 mb-3 flex flex-wrap gap-5 justify-center items-center">
        {user ? (
          <>
            {!loading ? (
              <>
                {searchUsers.map((searchUser: any, idx) => {
                  return (
                    <div key={idx}>
                      <div
                        className={`pt-20 mb-16 shadow-2xl shadow-black/[0.2] rounded-md text-center flex flex-col justify-center max-w-[16rem] ${
                          theme
                            ? "bg-[#2f2f2f] text-white"
                            : "bg-[#efeeee] text-[#232323]"
                        } ${user._id === searchUser._id ? "hidden" : ""}`}
                      >
                        <div className="select-none">
                          <img
                            src={searchUser.url}
                            className={`shadow-2xl shadow-black/[0.2] rounded-3xl h-32 w-32 mx-auto -mt-32 transform-gpu transition-all hover:scale-110`}
                          />
                        </div>

                        <h1
                          className={`text-xl font-bold ${
                            theme ? "text-[#d7d6d6]" : "text-[#545454]"
                          } pt-2 px-2`}
                        >
                          {searchUser.userName}
                        </h1>

                        <p
                          className={`${
                            theme ? "text-[#d7d6d6]" : " text-[#545454]"
                          } mt-2 px-12`}
                        >
                          🤷‍♂️ {searchUser.friends.length}Friends
                        </p>

                        <div
                          className={`mt-6 flex flex-col rounded-b-md rounded-t-2xl shadow-xl p-1 hover:scale-105 ${
                            theme
                              ? "bg-[#555555] shadow-[#000000]"
                              : "bg-[#ffffff] shadow-[#b8b7b7] text-[#545454]"
                          }`}
                        >
                          <button
                            className="font-semibold px-4 py-2 rounded-md flex items-center space-x-2 transform-gpu transition-all duration-200 hover:bg-purple-400 active:scale-90 w-full"
                            disabled={user.friends.includes(searchUser._id)}
                            onClick={() => handleRequest(searchUser._id)}
                          >
                            <span>
                              {user.friends.includes(searchUser._id)
                                ? "Friends"
                                : `${
                                    sentRequest.includes(String(searchUser._id))
                                      ? "Request Sent"
                                      : "Add Friend"
                                  }`}
                            </span>
                          </button>

                          <Link to={`/profile/${searchUser._id}`}>
                            <div
                              className={`h-[0.8px] ${
                                theme ? "bg-[#444343]" : "bg-[#d1d0d0]"
                              } mt-1 mb-1`}
                            ></div>
                            <button className="font-semibold px-4 py-2 rounded-md flex items-center space-x-2 transform-gpu transition-all duration-200 hover:bg-purple-400 active:scale-90 w-full">
                              <span>View Profile</span>
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <FriendsSkeleton />
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SearchUsers;
