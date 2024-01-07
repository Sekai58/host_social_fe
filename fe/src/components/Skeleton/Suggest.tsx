import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelector } from 'react-redux';

const SuggestSkeleton = () => {
    const theme = useSelector((state:any)=>{
        return state.theme.dark
      })
    
  return (
    <div className='w-full'>
    <SkeletonTheme baseColor={`${theme?'#525252':'#e0dfdf'}`} highlightColor={`${theme?'#000000':'#ffffff'}`}>
    <div className={` w-full bg-gradient-to-r from-[#d3bdfa] via-[#c7a6ff] to-[#aa77f0] border-t-[1px] border-[#aa77f0] rounded-md `}>
          <div className={`${theme?'bg-[#313131] text-[#e0dfdf]':'bg-[#e6e5e5] text-[#525252]'} mt-[6px] rounded-md px-3 pb-2`}>
            <h2 className='text-left p-3 text-lg'><Skeleton/></h2>  
            <div  className={`flex w-full items-center`}>
                <div>
                    <Skeleton circle={true} width={32} height={32}/>
                </div>
                <div className='w-full px-4 text-[10px]'>
                    <p>
                        <Skeleton height={12}/>
                    </p>
                </div>
            </div>   
            <div  className={`flex w-full items-center`}>
                <div>
                    <Skeleton circle={true} width={32} height={32}/>
                </div>
                <div className='w-full px-4 text-[10px]'>
                    <p>
                        <Skeleton height={12}/>
                    </p>
                </div>
            </div>      
          </div>
        </div>
  </SkeletonTheme>
  </div>
  );
};

export default SuggestSkeleton;
