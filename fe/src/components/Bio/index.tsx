// import axios from 'axios'
// import { useEffect } from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

const Bio =(props:any)=>{
    const theme = useSelector((state:any)=>{
        return state.theme.dark
      })

      const user = useSelector((state:any)=>{
        // console.log("at bio",state.user,)
        return state.user
      })

    return(
        <>
            <div className={` w-full rounded-md ${theme?'bg-[#161616]':'bg-[#f3f2f2] border-[1px] border-[#d4d4d4]'} `}>
                <div className={`${theme?'bg-hero-pattern bg-cover':'bg-hero-pattern bg-cover'} w-full h-16 py-5 px-2 rounded-t-md flex justify-center`}><img src={user.url} className={`w-20 h-20 rounded-full ${theme?'bg-[#161616]':'bg-[#f3f2f2]'}  p-[6px]`}/></div>
                <div className={`${theme?'bg-[#313131] text-[#e0dfdf]':'bg-[#000000] bg-opacity-5 text-[#525252]'} mt-[6px] rounded-b-lg pt-7 px-2 pb-1`}>
                  <p className='text-xl'>{user.userName}</p>
                  <p className={`text-md ${theme?'text-[#c0bfbf]':'text-[#797878]'}  mb-[6px]`}>{user.email}</p>
                  <div className={`h-[0.8px] ${theme?'bg-[#444343]':'bg-[#d1d0d0]'} mb-2`}></div>
                  <div className='flex justify-evenly'>
                    <div className={`flex-1 border-r-2 ${theme?'border-[#5a5959]':'border-[#c4c3c3]'}`}>
                        {/* <p className={`text-md ${theme?'text-[#e2e1e1]':'text-[#4e4e4e]'}`}>100</p> */}
                        <p className='text-md mb-2'>📹 {props.postsCount} Posts</p>
                    </div>
                    <div className='flex-1'>
                        {/* <p className={`text-md ${theme?'text-[#e2e1e1]':'text-[#4e4e4e]'}`}>{user.friends.length}</p> */}
                        <p className='text-md'>🤷‍♂️ {user.friends.length} Friends</p>
                    </div>
                  </div>
                  <div className={`h-[0.8px] ${theme?'bg-[#444343]':'bg-[#d1d0d0]'} mt-2 mb-1`}></div>
                  <Link to={`/profile/${user._id}`}>
                  <button className={`text-md w-full text-center ${theme?'hover:bg-[#3a3a3a]':'hover:bg-black hover:bg-opacity-5'} hover:text-[#aa77f0] rounded-md py-3 font-semibold`}>
                      My Profile
                  </button>
                  </Link>
                  </div>
              </div>
        </>
    )
}

export default Bio