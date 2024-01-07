import {useSelector,useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { changeDrop, changeNotify, changeUser, newPost, unauthenticate} from '../../features/slice';

const Dropdown = ()=>{
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const theme = useSelector((state:any)=>{
    return state.theme.dark
  })

  const user = useSelector((state:any)=>{
    // console.log("at drop down",state.user)
    return state.user
  })

  const drop = useSelector((state:any)=>{
    // console.log(state.drop.value)
    return state.drop.value
  })

  const handleLogout = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem("auth")
    dispatch(unauthenticate())
    dispatch(changeUser({_id:'',userName:'',email:'',fullName:'',url:'', friends:[]}))
    dispatch(newPost())
    navigate('/login')
  }

    return(
      <>
        <div className='h-8 w-8 rounded-full flex justify-center items-center text-xl text-[#ebebfe] cursor-pointer relative'>
          <img src={user.url} className='h-8 w-8 rounded-full' onClick={()=>{dispatch(changeDrop(!drop));dispatch(changeNotify(false))}} />
            <div className={` z-10 ${(drop===true)?'solid':'hidden'} w-[310px] h-[250px] rounded-md border-[1px] ${theme?'bg-[#313131] shadow-[#151515] border-[#474747] ':'border-[#b1b0b0] bg-[#d4d4d4] shadow-[#b4b3b3]'}  p-3 absolute top-12 -left-52 sm:-left-72 shadow-xl `} onClick={()=>dispatch(changeDrop(true))}>
                <div className={`${theme?'bg-[#232323] shadow-[#0c0c0c]':'bg-[#e9ebee] shadow-[#868686]'} w-full h-[6.5rem] py-1 px-2 rounded-md flex items-center shadow-md `}>
                  <div className='flex gap-3 items-center'>
                    <img src={user.url} className={`w-[3.2rem] h-[3.2rem] rounded-full ${theme?'bg-[#313131]':'bg-[#d4d4d4]'}  p-[6px]`}/>
                    <div className={`${theme?'text-[#c0bfbf]':'text-[#4e4e4e]'}`}>
                    <p>{user.userName}</p>
                    <p className={`text-sm ${theme?'text-[#919090]':'text-[#616161]'}  mb-2`}>{user.email}</p>
                    </div>
                  </div>
                </div>
                <div className={`${theme?'bg-[#1d1d1d] text-[#969595]':'bg-[#e9ebee] text-[#4e4e4e]'} mt-3 rounded-md px-2 py-1`} >
                  <Link to='/editprofile'>
                    <button className={`text-[18px] w-full text-left ${theme?'hover:bg-[#3a3a3a]':'hover:bg-black hover:bg-opacity-10'} rounded-md py-2 pl-1`}>
                      <i className="fa-solid fa-user mr-2"></i>Profile
                    </button>
                  </Link>
                  <div className='h-[0.8px] bg-[#444343] my-1'></div>
                    <button className={`text-[18px] w-full text-left ${theme?'hover:bg-[#3a3a3a]':'hover:bg-black hover:bg-opacity-10'} rounded-md py-2 pl-1`} onClick={()=>handleLogout()}><i className="fa-solid fa-right-from-bracket mr-2"></i>Logout</button>
                </div>
            </div>
        </div>
      </>
    )
}

export default Dropdown