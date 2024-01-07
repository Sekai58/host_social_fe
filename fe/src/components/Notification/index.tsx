import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import NotificationSkeleton from "../Skeleton/Notification";
import { changeCount } from "../../features/slice";

const Notifications: React.FC = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => {
    return state.theme.dark;
  });

  const notify = useSelector((state: any) => {
    return state.notify.value;
  });

  const user = useSelector((state: any) => {
    return state.user;
  });

  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [fetch, setFetch] = useState(false);
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const socket = io("https://socialsync-xmk6.onrender.com");
    setSocket(socket);
    console.log(socket);

    socket?.emit("fromclient", "Hello from the client!");

    socket?.on("fromserver", (message: any) => {
      console.log("Received message from server:", message);
    });
  }, []);

  //Get notification socket
  useEffect(() => {
    socket?.on("getNotification", (data: any) => {
      console.log("commented data", data);
      if (data.receiver === user.userName) {
        setFetch(true);
      }
    });
  });

  useEffect(() => {
    axios
      .get(
        `https://socialsync-xmk6.onrender.com/api/user/${user._id}/notification`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((res) => {
        setData(res.data);
        const countData = res.data.filter(
          (notification: any) => notification.status === "Unread"
        );
        const count = countData.length;
        dispatch(changeCount(count));
        // console.log("count here",count)
        setLoading(false);
        setFetch(false);
      })
      .catch((err) => {
        setError(err);
        console.log(error);
      });
  }, [user._id, fetch]);

  const handleCount = (id: any) => {
    axios
      .put(
        `https://socialsync-xmk6.onrender.com/api/user/notification/${id}`,
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setFetch(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div
        className={`absolute right-5 top-24 sm:top-16 z-10 ${
          !notify ? "hidden" : "solid"
        }`}
      >
        <div
          className={` border-[1px] border-b-0 ${
            theme
              ? "bg-[#1d1d1d] text-[#e0dfdf] border-[#474747]"
              : "bg-[#e6e5e5] text-[#525252] border-[#b1b0b0]"
          } w-full h-12 flex items-center text-xl pl-3 justify-between rounded-t-md`}
        >
          Notifications
        </div>
        <div
          className={`h-[300px] w-[300px] overflow-auto scrollbar-none ${
            theme ? "scrollbar-thumb-[#232323]" : "scrollbar-thumb-[#c3c3c4]"
          } ${
            theme
              ? "bg-[#313131] text-[#e0dfdf]"
              : "bg-[#f3f2f2] border-[1px] border-[#b1b0b0]"
          }  scrollbar-track-[#7878bc] rounded-b-md`}
        >
          {!loading ? (
            <>
              {data.map((notify: any, idx: number) => {
                return (
                  <div key={idx} className="flex flex-col">
                    <div
                      className={` pt-4 pb-2  ${
                        theme
                          ? "hover:bg-[#313131] text-[#a1a1a1]"
                          : "hover:bg-[#e9e9fe] text-[#424242]"
                      }`}
                    >
                      <div className="px-3 mb-0 flex items-center">
                        <img
                          className="h-6 w-6 rounded-full mr-2"
                          src={notify.sender.url}
                        />
                        {notify.message}
                      </div>
                      {notify.status === "Unread" ? (
                        <div
                          className={`px-3 text-right text-[10px] underline hover:scale-105 ${
                            theme ? "" : " text-[#5c5b5b]"
                          }`}
                        >
                          <button
                            className="hover:scale-105 underline"
                            onClick={() => handleCount(notify._id)}
                          >
                            Mark as read
                          </button>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div
                      className={`h-[0.8px] ${
                        theme ? "bg-[#444444]" : "bg-[#c3c3c4]"
                      }`}
                    ></div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="">
              <NotificationSkeleton />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Notifications;
