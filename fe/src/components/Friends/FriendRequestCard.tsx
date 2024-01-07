import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { changeFetch } from "../../features/slice";

const FriendRequestCard = (props: any) => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [mutualCount, setMutualCount] = useState(0);

  const theme = useSelector((state: any) => {
    return state.theme.dark;
  });

  const user = useSelector((state: any) => {
    return state.user;
  });

  // MUTUAL FRIENDS
  useEffect(() => {
    if (user) {
      const mutualFriend = user.friends.filter((friend: any) =>
        props.friend.requestFrom.friends.includes(friend)
      );
      // console.log("mutual friend here",mutualFriend)
      setMutualCount(mutualFriend.length);
    }
  }, [user]);

  const handleApprove = async (id: string) => {
    // console.log("requested id here",id)
    await axios
      .post(
        "https://socialsync-xmk6.onrender.com/api/approve-request",
        { _id: id, status: "Approved" },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((res) => {
        toast.success("Request Accepted", { theme: theme ? "dark" : "light" });
        dispatch(changeFetch(true));
        console.log(res.data);
      })
      .catch((err: any) => {
        toast("Request failed");
        console.log(err);
      });
  };

  const handleDecline = async (id: string) => {
    // console.log("requested id here",id)
    await axios
      .post(
        "https://socialsync-xmk6.onrender.com/api/approve-request",
        { _id: id, status: "Declined" },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        dispatch(changeFetch(true));
        toast.success("Request Declined", { theme: theme ? "dark" : "light" });
      })
      .catch((err: any) => {
        toast("Request failed");
        console.log(err);
      });
  };

  return (
    <div className="pt-10 mb-3">
      <div
        className={`pt-20 shadow-2xl shadow-black/[0.2] rounded-md text-center flex flex-col justify-center max-w-[16rem] ${
          theme ? "bg-[#2f2f2f] text-white" : "bg-[#efeeee] text-[#232323]"
        } `}
      >
        <Link to={`/profile/${props.friend.requestFrom._id}`}>
          <div className="select-none">
            <img
              src={props.friend.requestFrom.url}
              className={`shadow-2xl shadow-black/[0.2] rounded-3xl h-32 w-32 mx-auto -mt-32 transform-gpu transition-all hover:scale-110`}
            />
          </div>
        </Link>

        <h1
          className={`text-xl font-bold ${
            theme ? "text-[#d7d6d6]" : "text-[#545454]"
          } pt-2 px-2`}
        >
          {props.friend.requestFrom.userName}
        </h1>

        <p
          className={`${
            theme ? "text-[#d7d6d6]" : " text-[#545454]"
          } mt-2 px-5`}
        >
          👨‍👩‍👧‍👦 {mutualCount} Mutual Friends
        </p>

        <div
          className={`mt-6 flex flex-col rounded-b-md rounded-t-2xl shadow-xl p-1 hover:scale-105 ${
            theme
              ? "bg-[#555555] shadow-[#000000]"
              : "bg-[#ffffff] shadow-[#b8b7b7] text-[#545454]"
          }`}
        >
          <button
            className="font-semibold px-4 py-2 rounded-md flex items-center space-x-2 transform-gpu transition-all duration-200 hover:bg-green-400 active:scale-90"
            onClick={() => handleApprove(props.friend._id)}
          >
            <span>Accept</span>
          </button>
          <div
            className={`h-[0.8px] ${
              theme ? "bg-[#444343]" : "bg-[#d1d0d0]"
            } mt-1 mb-1`}
          ></div>
          <button
            className="font-semibold px-4 py-2 rounded-md flex items-center space-x-2 transform-gpu transition-all duration-200 hover:bg-red-400 active:scale-90"
            onClick={() => handleDecline(props.friend._id)}
          >
            <span>Decline</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestCard;
