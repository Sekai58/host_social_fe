import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgetPasswordSchema } from "../../types/type";

const ForgetPassword = () => {
  const navigate = useNavigate();
  type LoginParams = z.infer<typeof ForgetPasswordSchema>;

  const theme = useSelector((state: any) => {
    console.log(state.theme);
    return state.theme.dark;
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginParams>({ resolver: zodResolver(ForgetPasswordSchema) });

  const onSubmit: SubmitHandler<LoginParams> = async (data: LoginParams) => {
    console.log("reached here", data);
    await axios
      .post("https://socialsync-xmk6.onrender.com/api/forgetpassword", data)
      .then((res) => {
        console.log(res.data.token);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        reset();
      });
    // reset();
  };

  const onError = (e: any) => {
    console.log("reached here", e);
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 min-h-screen w-full ${
          theme ? "bg-black" : "bg-white"
        } bg-opacity-80 z-[999] flex justify-center items-center`}
      >
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="flex flex-col justi gap-5 w-[70%] sm:w-[30%]  border-2 border-[#888787] p-5 bg-[#706b6b] bg-opacity-10 z-[89] shadow-[#121212] shadow-2xl"
        >
          <div>
            {/* <label className="text-[#ffffff] ">Email:</label> */}
            <input
              type="text"
              placeholder="Email"
              {...register("email")}
              className=" mb-2 py-2 px-2 bg-opacity-20 text-[#c4c3c3] border-0 border-b-2 border-[#888787] focus:border-[#888787] focus:border-b-0 bg-black w-full"
            />
            {errors.email && (
              <p className="text-red-400">{errors.email.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="border-2 border-[#888787] bg-[#7878b2] text-[#ffffff] rounded-2xl px-2 py-2 hover:shadow-md hover:shadow-white hover:border-0"
          >
            Send Email
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgetPassword;
