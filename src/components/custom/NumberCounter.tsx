import React, { useEffect, useState } from "react";

interface CounterProps {
    from?: number;
    to: number;
    duration?: number; // Thời gian chạy số (ms)
}

const Counter: React.FC<CounterProps> = ({ from = 0, to, duration = 1000 }) => {
    const [value, setValue] = useState<number>(from);

    useEffect(() => {
        const startTime = performance.now();
        const step = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1); // Tỷ lệ tiến độ (từ 0 đến 1)
            const currentValue = from + (to - from) * progress; // Giá trị hiện tại
            setValue(Math.round(currentValue)); // Cập nhật giá trị (làm tròn)

            if (progress < 1) {
                requestAnimationFrame(step); // Tiếp tục cập nhật
            }
        };

        requestAnimationFrame(step); // Bắt đầu animation
    }, [from, to, duration]);

    return (
        <div className="text-5xl">
            {value}
        </div>
    );
};


interface NumberCounterProps {
    from: number;
    to: number;
    title: string;
}
const NumberCounter: React.FC<NumberCounterProps> = ({
    from,
    to,
    title
}) => {
    return (
        <div
            className='cursor-pointer hover:shadow-secondary/20 hover:shadow-md hover:border-2 duration-500 bg-[#F1EDE6] text-gray-600 text-lg  p-8 flex flex-col gap-3 items-center justify-center text-center shadow-xl'>
            <p className=' text-black font-light '>{title}</p>
            <Counter  from={from} to={to} duration={5000}  />
        </div>
    )
}

export default NumberCounter;