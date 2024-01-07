import { Link, useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {changeDrop, changeNotify, changeQuery, changeTheme} from '../../features/slice';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import img from '../../assets/sslogo.png'
import Dropdown from '../Dropdown/index';
import {z} from "zod"
import { SearchUserSchema } from '../../types/type';
import { zodResolver } from '@hookform/resolvers/zod';
import Notifications from '../Notification';

const Navbar = () => {
  type SearchParams = z.infer<typeof SearchUserSchema>
  // const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<SearchParams>({resolver:zodResolver(SearchUserSchema)});

  
  const theme = useSelector((state:any)=>{
    return state.theme.dark
  })

  const count = useSelector((state:any)=>{
    return state.count.count
  })
  const notify = useSelector((state:any)=>{
    return state.notify.value
  })

  const handleTheme =()=>{
    dispatch(changeTheme())
  }

  const onSubmit = (data:any) => {
    dispatch(changeQuery(data.query))
    navigate(`/search/user?name=${data.query}`)
  };

  const handleKeyDown = (e:any) => {
    if (e.key === 'Enter') {
      handleSubmit(onSubmit)();
    }
  };

  return (
  <div className={`fixed top-0 left-0 z-[99] w-full ${theme?'bg-[#1a1919] border-[#232323]':'bg-[#e9ebee] border-[#cdcdfc]'} border-b-[1px] `}>
    <div className={`flex flex-col sm:flex-row px-3 py-3 justify-between sm:px-5 items-center`}>
        <div className="flex gap-2 items-center">
          <div className="flex items-center">
            <Link to='/'>
            <img src={img} className=" h-10 w-10"/>
            </Link>
          </div>
          <div className={`relative ${theme?'text-[#5d5c5c]':'text-[#bcbaba]'}`}>
            <span className="absolute left-2 top-2"><i className="fa-solid fa-magnifying-glass"></i></span>
            <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder='Search SocialSync' {...register('query')} onKeyDown={(e)=>handleKeyDown(e)} className={`pl-7 h-10 w-28 sm:w-56 border-1 ${theme?'bg-[#323232] text-[#929191]':'bg-[#000000] bg-opacity-5 text-[#545454]'}  rounded-full transition-all duration-300 ease-in-out sm:focus:w-80 focus:w-full focus:outline-none focus:border-2 focus:border-[#aa77f0]`}/>
            </form>
          </div>
        </div>

        <div className="flex gap-6">
          <Link to='/'>
            <button className={`flex items-start ${(location.pathname=='/')?'text-[#aa77f0] underline underline-offset-8':' text-[#757575]'}`} onClick={()=>{dispatch(changeDrop(false))}}>
              <i className="fa-solid fa-house text-xl "></i>
                <span className={`${theme?'text-[#ababab]':'text-[#757575]'} hidden text-[19px] sm:flex`}>Home</span>
            </button>
          </Link>
          <Link to='/friends'>
            <button className={`flex items-start ${(location.pathname=='/friends')?'text-[#aa77f0] underline underline-offset-8':' text-[#757575]'}`} onClick={()=>{dispatch(changeDrop(false))}}>
              <i className="fa-solid fa-user-group text-xl"></i>
                <span className={`${theme?'text-[#ababab]':'text-[#757575]'} hidden text-[19px] sm:flex`}>Friends</span>
            </button>
          </Link>
          <div className={`${theme?'text-[#555555]':'text-[#757575]'} cursor-pointer`}>
            <i className={`fa-solid fa-star-and-crescent text-xl -rotate-45`} onClick={handleTheme}></i>
          </div>
          <button className={`${theme?'text-[#555555]':'text-[#757575]'} cursor-pointer`} onClick={()=>{dispatch(changeNotify(!notify));dispatch(changeDrop(false))}}>
          {(count>0)?<p className='absolute top-12 sm:top-4 sm:right-20 bg-red-400 rounded-full text-white text-[10px] px-[4px]'>{count}</p>:<></>}
            <i className="fa-solid fa-bell text-xl"></i>
          </button>
          {/* {notify?<Notifications/>:<></>} */}
            <Notifications/>
          <div>
            <Dropdown/>
          </div>
        </div>
    </div>
</div>
  )
  }
export default Navbar