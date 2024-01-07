import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

const Contacts =(props:any)=>{
    const theme = useSelector((state:any)=>{
        return state.theme.dark
      })

    return(
        <>
          {props.friend?<>
            <Link to={`/profile/${props.friend._id}`}>
            <div className={`${theme?'hover:bg-[#3a3a3a]':'hover:bg-black hover:bg-opacity-5'} flex rounded-md items-center px-2`}>
                <img src={props.friend.url} className={`w-10 h-10 mr-2 rounded-full`}/>
                <button className={`text-[16px] w-full text-left  hover:text-[#aa77f0] rounded-md py-3`}>
                     {props.friend.userName}
                </button>
            </div>
            </Link>
          </>:<></>}
        </>
    )
}

export default Contacts