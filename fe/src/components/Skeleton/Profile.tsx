import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelector } from 'react-redux';

const ProfileSkeleton = () => {
    const theme = useSelector((state:any)=>{
        return state.theme.dark
      })
    
  return (
    <SkeletonTheme baseColor={`${theme?'#525252':'#e0dfdf'}`} highlightColor={`${theme?'#000000':'#ffffff'}`}>
    <div className="w-full lg:w-[20%] flex lg:flex-col items-center justify-center lg:fixed">
        <Skeleton height={90} width={90} circle={true}/>
        <div className={`w-full flex flex-col lg:items-center p-5 ${theme?'text-[#c0bfbf]':'text-[#474747]'}`}>
            <p className="text-2xl w-[70%]"><Skeleton/></p>
            <p className={`text-md w-[80%] mb-[6px]`}><Skeleton/></p>
            <div className="pt-7 w-full flex flex-col lg:items-center">
                <p className='mb-2 text-start w-[70%]'><Skeleton/></p>
                <p className='text-start w-[70%]'><Skeleton/></p>
            </div>
        </div>
    </div>
  </SkeletonTheme>
  );
};

export default ProfileSkeleton;
