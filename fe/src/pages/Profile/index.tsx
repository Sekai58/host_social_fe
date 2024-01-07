import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeDrop } from "../../features/slice";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { z } from "zod";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { UserRegisterSchema } from "../../types/type";
import { zodResolver } from "@hookform/resolvers/zod";

type RegisterParams = Partial<z.infer<typeof UserRegisterSchema>>;

const Profile = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<RegisterParams>({
    resolver: zodResolver(UserRegisterSchema.partial()),
  });
  const [userImage, setUserImage] = useState<any>();

  useEffect(() => {
    dispatch(changeDrop(false));
  }, []);

  const theme = useSelector((state: any) => {
    return state.theme.dark;
  });

  const user = useSelector((state: any) => {
    return state.user;
  });

  const [picture, setPicture] = useState(user.url);
  useEffect(() => {
    setPicture(user.url);
  }, [user]);

  const onChangePicture = (e: any) => {
    // console.log('picture: ', picture)
    setPicture(URL.createObjectURL(e.target.files[0]));
    setUserImage(e.target.files ? e.target.files[0] : null);
    // console.log("updated url",picture)
  };

  const onSubmit: SubmitHandler<RegisterParams> = (data, e) => {
    e?.preventDefault();
    const formData = new FormData();
    formData.append("file", userImage);
    if (data.fullName !== undefined) {
      formData.append("fullName", data.fullName);
    }
    axios
      .post(
        `https://socialsync-xmk6.onrender.com/api/user/${user._id}`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success(res.data, { theme: theme ? "dark" : "light" });
        // navigate('/login')
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("Error update profile", {
          theme: theme ? "dark" : "light",
        });
      });
    console.log(JSON.stringify(data));
    // reset();
  };

  const onError = (e: any) => {
    console.log(e);
    // reset();
  };

  return (
    <div className="pt-28 sm:pt-16 text-white min-h-screen flex items-center">
      <div className="w-full px-3 sm:px-10 flex">
        <div
          className={`${
            theme ? " bg-opacity-70" : ""
          } shadow-lg shadow-[#aa77f0] w-full rounded-md`}
        >
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="flex flex-col justify-center border-0 rounded-r-xl w-full h-full backdrop-blur-[2px]"
            encType="multipart/form-data"
          >
            <div className="flex flex-col lg:flex-row w-full">
              {/* LEFT SIDE OF PROFILE */}
              <aside className=" w-full md:w-[80%] xl:w-[50%] p-5">
                <div
                  className={` ${
                    theme ? "bg-[#313131] shadow-black" : "bg-[#efeeee]"
                  } shadow-2xl rounded-md w-full`}
                >
                  <div>
                    <h2
                      className={`${
                        theme
                          ? "text-[#ffffff] bg-[#202022]"
                          : "text-[#4d4d4d] bg-[#d9d9d9]"
                      } py-5 px-3 rounded-t-md`}
                    >
                      Profile
                    </h2>
                    {/* <div className="h-[0.8px] bg-[#444444]"></div> */}
                    <div
                      className={`h-[0.8px] ${
                        theme ? "bg-[#444343]" : "bg-[#d1d0d0]"
                      }`}
                    ></div>
                  </div>
                  <div className="p-3 flex justify-center  items-center">
                    <img src={picture} className="rounded-full w-40 h-40" />
                    <div
                      className={`p-3 text-lg ${
                        theme ? "text-[#c8c8c8]" : "text-[#616161]"
                      }`}
                    >
                      <p>{user.userName}</p>
                      <p className={`text-sm mb-7`}>{user.email}</p>
                      <div className="-translate-x-12 translate-y-4">
                        <label
                          htmlFor="choose_file"
                          className="py-1 px-2 hover:bg-[#555555] bg-[#aa77f0] cursor-pointer rounded-full text-white"
                        >
                          <i className="fa-solid fa-camera-retro"></i>
                          <input
                            type="file"
                            id="choose_file"
                            name="video_to_upload"
                            className="hidden"
                            accept="image/jpeg, image/png"
                            onChange={(e) => {
                              onChangePicture(e);
                            }}
                          />
                          {errors.file && (
                            <p className="text-red-400">
                              {errors.file.message}
                            </p>
                          )}
                          {/* <i className="fa fa-cloud-upload fa-fw" aria-hidden="true"></i>&nbsp; */}
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* <div className="h-[0.8px] bg-[#444444] mx-4"></div> */}
                  <div
                    className={`h-[0.8px] ${
                      theme ? "bg-[#444343]" : "bg-[#d1d0d0]"
                    }`}
                  ></div>
                  <div
                    className={`flex ${
                      theme ? "text-[#c3c3fc]" : "text-[#232323]"
                    } justify-center text-2xl px-4 py-1 lg:px-5 lg:py-5`}
                  >
                    {/* <div className="text-[1.05rem]">📹 100 Posts</div> */}
                    {/* <div className="text-[1.75rem] px-3">|</div> */}
                    <div className="text-[1.05rem]">
                      🤷‍♂️ {user.friends.length} Friends
                    </div>
                    {/* <div className="flex gap-1 items-center text-sm "><i className="fa-solid fa-clipboard bg-transparent text-[#44df78] shadow-[#44df78] shadow-md"></i>200 Posts</div> */}
                    {/* <div className="flex gap-1 items-center text-sm"><i className="fa-solid fa-user-group bg-transparent text-[#44df78] shadow-[#44df78] shadow-md"></i>300 Friends</div> */}
                  </div>
                </div>
              </aside>

              {/* RIGHT SIDE OF PROFILE */}
              <section className="w-full p-5 ">
                <div
                  className={`flex-1 ${
                    theme ? "bg-[#313131] shadow-black" : "bg-[#efeeee]"
                  } shadow-2xl rounded-md`}
                >
                  <div>
                    <h2
                      className={`${
                        theme
                          ? "text-[#ffffff] bg-[#202022]"
                          : "text-[#4d4d4d] bg-[#d9d9d9]"
                      } py-5 px-3 rounded-t-md`}
                    >
                      Account Details
                    </h2>
                    <div
                      className={`h-[0.8px] ${
                        theme ? "bg-[#444343]" : "bg-[#d1d0d0]"
                      }`}
                    ></div>
                  </div>
                  <div className="p-3 flex flex-col gap-11">
                    <div>
                      <label
                        className={`${
                          theme ? "text-[#d5d5d5]" : "text-[#191919]"
                        }`}
                      >
                        Fullname:
                      </label>
                      <input
                        defaultValue={user.fullName}
                        placeholder="Enter name"
                        {...register("fullName", { required: true })}
                        className={`${
                          theme
                            ? "text-[#d5d5d5] bg-black"
                            : "text-[#191919] bg-[#bcbbbb]"
                        } py-2 px-2 bg-opacity-20 border-0  border-b-2 border-[#888787] focus:border-[#aa77f0] focus:outline-none  w-full`}
                      />
                      {errors.fullName && (
                        <span className="text-[#f34242]">
                          {errors.fullName?.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label
                        className={`${
                          theme ? "text-[#d5d5d5]" : "text-[#191919]"
                        }`}
                      >
                        Username:
                      </label>
                      <input
                        value={user.userName}
                        placeholder="Enter username"
                        {...register("userName", { required: true })}
                        className={`${
                          theme
                            ? "text-[#d5d5d5] bg-black"
                            : "text-[#191919] bg-[#bcbbbb]"
                        } py-2 px-2 bg-opacity-20 border-0 border-b-2 border-[#888787] focus:border-[#aa77f0] focus:outline-none  w-full`}
                      />
                      {errors.userName && (
                        <span className="text-[#f34242]">
                          This field is required
                        </span>
                      )}
                    </div>

                    <div>
                      <label
                        className={`${
                          theme ? "text-[#d5d5d5]" : "text-[#191919]"
                        }`}
                      >
                        Email:
                      </label>
                      <input
                        placeholder="Enter email"
                        value={user.email}
                        {...register("email")}
                        className={`${
                          theme
                            ? "text-[#d5d5d5] bg-black"
                            : "text-[#191919] bg-[#bcbbbb]"
                        } py-2 px-2 bg-opacity-20 border-0 border-b-2 border-[#888787] focus:border-[#aa77f0] focus:outline-none w-full`}
                      />
                      {errors.email && (
                        <span className="text-[#f34242] ">Incorrect email</span>
                      )}
                    </div>

                    {/* <div> */}
                    {/* <label className={`${theme?'text-[#d5d5d5]':'text-[#191919]'}`}>Password:</label> */}
                    {/* <input type="password" placeholder='Enter password' {...register('password', { required: 'Password is required',pattern:/^.{6,}$/ })} className={`${theme?'text-[#d5d5d5]':'text-[#191919]'} mb-3 py-2 px-2 bg-opacity-20 border-0 border-b-2 border-[#888787] focus:border-[#888787] focus:border-b-0 bg-black w-full`} /> */}
                    {/* {errors.password && <p className='text-red-400'>{errors.password.message}</p>} */}
                    {/* </div> */}

                    {/* <div>
                      <label className={`${theme?'text-[#d5d5d5]':'text-[#191919]'}`}>Gender:</label>
                      <div className={`${theme?'text-[#d5d5d5]':'text-[#000000]'} flex justify-between`}>
                        <div><input type="radio" value="male" className="checked:bg-slate-400 text-slate-400 focus:border-white" {...register("gender",{required:true})} checked /><span className="px-1">MALE</span></div>
                        <div><input type="radio" value="female" className="checked:bg-slate-400 text-slate-400 focus:border-white" {...register("gender",{required:true})} /><span className="px-1">FEMALE</span></div>
                        <div><input type="radio" value="other" className="checked:bg-slate-400 text-slate-400 border-0 focus:border-white" {...register("gender",{required:true})} /><span className="px-1">OTHER</span></div>
                      </div>
                      </div> */}

                    <div className="">
                      <input
                        type="submit"
                        value="Save Changes"
                        className="border-2 border-[#888787] bg-[#aa77f0] text-[#ffffff] rounded-md px-2 py-1 cursor-pointer hover:shadow-md hover:shadow-white"
                      ></input>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
