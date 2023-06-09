'use client';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import React, { useEffect } from 'react';

export function CountDown() {
    dayjs.extend(duration);
    const [time, setTime] = React.useState<duration.Duration | undefined>(
        undefined,
    );
    useEffect(() => {
        const a = dayjs('2024-04-27T00:00:00Z');

        let b = dayjs(Date.now());

        const interval = setInterval(() => {
            b = dayjs(Date.now());
            setTime(dayjs.duration(a.diff(b)));
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="flex items-center gap-[10px]">
            <div className="text-[15px] w-[70px]">距離ICT DSE還有</div>
            <div> : </div>
            <div
                className="flex w-[100px]"
                title="以 2024年04月27日 08:00 UTC+8 為開始時間"
            >
                {time
                    ? `${Math.floor(
                          time.as('days'),
                      )}日${time.hours()}小時${time.minutes()}分鐘${time.seconds()}秒`
                    : '--日--小時--分鐘--秒'}
            </div>
        </div>
    );
}
