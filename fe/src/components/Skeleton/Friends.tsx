import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelector } from 'react-redux';

const FriendsSkeleton = () => {
    const theme = useSelector((state:any)=>{
        return state.theme.dark
      })
    
  return (
    <div className='w-full'>
    <SkeletonTheme baseColor={`${theme?'#525252':'#e0dfdf'}`} highlightColor={`${theme?'#000000':'#ffffff'}`}>
    <div className="pt-10 mb-3">
            <div
            className={`pt-20 pb-4 px-6 shadow-2xl shadow-black/[0.2] rounded-3xl text-center flex flex-col justify-center max-w-[16rem] ${theme?'bg-[#2f2f2f] text-white':'bg-[#efeeee] text-[#232323]'} `}>
            <div className="select-none">

            <div className={`shadow-2xl shadow-black/[0.2] rounded-3xl h-32 w-32 mx-auto -mt-32 transform-gpu transition-all hover:scale-110`}><Skeleton height={100}/></div>
                {/* <Skeleton circle={true} width={24} height={24}/> */}
            </div>

            <h1 className={`text-xl font-bold ${theme?'text-[#d7d6d6]':'text-[#545454]'} pt-2`}>
                <Skeleton/>
            </h1>

            <h1 className={`text-sm font-bold ${theme?'text-[#d7d6d6]':'text-[#545454]'}`}>
                <Skeleton/>
            </h1>

            <p className={`${theme?'text-[#d7d6d6]':' text-[#545454]'} mt-3`}>
                <Skeleton/>
            </p>

            <p className='mt-5'><Skeleton height={28}/></p>
        </div>
        </div>
  </SkeletonTheme>
  </div>
  );
};

export default FriendsSkeleton;
