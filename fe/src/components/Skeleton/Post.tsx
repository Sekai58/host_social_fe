import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelector } from 'react-redux';

const PostSkeleton = () => {
    const theme = useSelector((state:any)=>{
        return state.theme.dark
      })
    
  return (
    <div className='w-full'>
    <SkeletonTheme baseColor={`${theme?'#525252':'#e0dfdf'}`} highlightColor={`${theme?'#000000':'#ffffff'}`}>
    <div className={`${theme?'bg-[#313131] text-[#e0dfdf]':'bg-[#e6e5e5] text-[#525252]'} rounded-md mb-5 py-3 px-6`} >
                    <div  className={`flex rounded-md items-center`}>
                        <div>
                            <Skeleton circle={true} width={32} height={32}/>
                        </div>
                        <div className='w-[10%] px-4 text-[10px]'>
                            <p>
                                <Skeleton height={12}/>
                            </p>
                            <p><Skeleton height={10}/></p>
                        </div>
                    </div>
                    <div className='ml-12'>
                        <p><Skeleton/></p>
                    </div>
                    <div className='ml-12'>
                        <Skeleton count={4}/>
                    </div>
                </div>
  </SkeletonTheme>
  </div>
  );
};

export default PostSkeleton;
