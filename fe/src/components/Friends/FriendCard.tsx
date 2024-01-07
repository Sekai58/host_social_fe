import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"


const FriendsCard =(props:any)=>{
    const [mutualCount, setMutualCount] = useState(0)
    const theme = useSelector((state:any)=>{
        return state.theme.dark
    })

    const user = useSelector((state:any)=>{
        return state.user
    })

    useEffect(()=>{
        if(user){
            const mutualFriend = user.friends.filter((friend:any)=> props.friend.friends.includes(friend))
            console.log("mutual friend here",mutualFriend)
            setMutualCount(mutualFriend.length)
        }
    },[user])
    return(
        <>
        {props.friend?
        <div className="pt-10 mb-3">
            <div
            className={`pt-20 pb-4 px-6 shadow-2xl shadow-black/[0.2] rounded-3xl text-center flex flex-col justify-center max-w-[16rem] ${theme?'bg-[#2f2f2f] text-white':'bg-[#efeeee] text-[#232323]'} `}>
            <div className="select-none">
                <img src={props.friend.url}
                    className={`shadow-2xl shadow-black/[0.2] rounded-3xl h-32 w-32 mx-auto -mt-32 transform-gpu transition-all hover:scale-110`}/>
            </div>

            <h1 className={`text-xl font-bold ${theme?'text-[#d7d6d6]':'text-[#545454]'} pt-2`}>
                {props.friend.userName}
            </h1>

            <h1 className={`text-sm font-bold ${theme?'text-[#d7d6d6]':'text-[#545454]'}`}>
                {props.friend.email}
            </h1>

            <p className={`${theme?'text-[#d7d6d6]':' text-[#545454]'} mt-3`}>
                👨‍👩‍👧‍👦 {mutualCount} Mutual Friends
            </p>

            <div className="mt-6 flex justify-center">
                <Link to={`/profile/${props.friend._id}`}>
                <span className={`bg-[#aa77f0] font-bold text-white px-4 py-2 rounded-lg flex items-center space-x-2 transform-gpu transition-all duration-200 active:scale-90 ${theme?'hover:bg-[#545454]':'hover:bg-[#d7d6d6] hover:text-[#545454]'}`}>
                    View Profile
                </span>
                </Link>
            </div>
        </div>
        </div>
        :<div className="mt-28 text-white">Loading..</div>}
        </>
    )
}

export default FriendsCard