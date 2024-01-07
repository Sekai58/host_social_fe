import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { z } from "zod";
import { ResetPasswordSchema } from "../../types/type";
import { zodResolver } from "@hookform/resolvers/zod";

const ResetPassword = () => {
  type ResetParams = z.infer<typeof ResetPasswordSchema>;
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const theme = useSelector((state: any) => {
    console.log(state.theme);
    return state.theme.dark;
  });

  const {
    register,
    handleSubmit,
    // reset,
    // watch,
    formState: { errors },
  } = useForm<ResetParams>({ resolver: zodResolver(ResetPasswordSchema) });

  const onSubmit: SubmitHandler<ResetParams> = async (data: ResetParams) => {
    console.log("over here", data);
    await axios
      .post(
        "https://socialsync-xmk6.onrender.com/api/resetpassword",
        { password: data.password },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.token);
        toast.success("Password successfully updated");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Unauthorized");
      });
    // console.log(data);
    // reset();
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 min-h-screen w-full ${
          theme ? "bg-black" : "bg-white"
        } bg-opacity-80 z-[999] flex justify-center items-center`}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justi gap-5 w-[70%] sm:w-[30%]  border-2 border-[#888787] p-5 bg-[#706b6b] bg-opacity-10 z-[89] shadow-[#121212] shadow-2xl"
        >
          <div>
            <label className="text-[#ffffff] ">New Password:</label>
            <input
              type="password"
              placeholder="Enter password"
              {...register("password")}
              className=" mb-3 py-2 px-2 bg-opacity-20 text-[#c4c3c3] border-0 border-b-2 border-[#888787] focus:border-[#888787] focus:border-b-0 bg-black w-full"
            />
            {errors.password && (
              <p className="text-red-400">{errors.password.message}</p>
            )}
            <label className="text-[#ffffff] ">Confirm Password:</label>
            <input
              type="password"
              placeholder="Enter password"
              {...register("confirmPassword")}
              className=" mb-3 py-2 px-2 bg-opacity-20 text-[#c4c3c3] border-0 border-b-2 border-[#888787] focus:border-[#888787] focus:border-b-0 bg-black w-full"
            />
            {errors.confirmPassword && (
              <p className="text-red-400">{errors.confirmPassword.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="border-2 border-[#888787] bg-[#7878b2] text-[#ffffff] rounded-2xl px-2 py-2 hover:shadow-md hover:shadow-white hover:border-0"
          >
            Update Password
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
