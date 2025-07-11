//hook phát hiện kích thước màn 
import {useState, useEffect} from 'react';

interface WindowSize {
    width:number | undefined;
    height:number | undefined;
    isMobile:boolean | undefined;
}

export const useWindowSize = () =>{
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width:undefined,
        height:undefined,
        isMobile:false,
    });

    useEffect(()=>{
        // hàm xử lý việc cập nhật kích 
        function handleResize(){
            const width = window.innerWidth;
            const height = window.innerHeight;
            // xác định nếu là thiết bị di động dưới 768px
            const isMobile = width < 768;

            setWindowSize({
                width,
                height,
                isMobile,
            });
        }
        // thực hiện ngay lập tức
        handleResize();
        // thêm event listener
        window.addEventListener('resize',handleResize);
        // cleanup khi component unmount
        return ()=>window.removeEventListener('resize', handleResize);
    },[]);

    return windowSize;
}