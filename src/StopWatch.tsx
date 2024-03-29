import React from 'react'
import { getTime } from './helper';
import Table from 'react-bootstrap/Table';

type stopWatchDisplayProps = {
    totalElapsed: number,
}

/**
 * This is a component that renders the stopwatch.
 *
 * @export
 * @param {stopWatchDisplayProps} props - The properties passed to this component.
 * @param {number} props.totalElapsed - The total elapsed time in seconds.
 *
 * @returns A JSX element that displays the hours, minutes, seconds, and milliseconds of the total elapsed time in a formatted manner.
 */
export default function StopWatch(props: stopWatchDisplayProps) {
    let {totalElapsed} = props;
    let {hours, minutes, seconds, ms} = getTime(totalElapsed)
    let render = [
        {
            name : " HH",
            type:  "hour",
            value: hours.toString().padStart(2, '0'),
            dataTestID: "StopwatchHours"
        },
        {
            name : "MM",
            type:  "minute",
            value: ": " + minutes.toString().padStart(2, '0'),
            dataTestID: "StopwatchMinutes"
        },
        {
            name : "SS",
            type:  "seconds",
            value: ": " + seconds.toString().padStart(2, '0'),
            dataTestID: "StopwatchSeconds"
        },
        {
            name : " ms",
            type:  "ms",
            value: "." + ms.toString().padStart(2, '0'),
            dataTestID: "StopwatchMs"
        }
    ]
    return(
        <div style= {{display: 'flex', gap: "0.5rem"}} aria-label='stopwatchDisplay'>
            {
                render.map((item, index) => {
                    return <div key={index} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <div aria-label={item.type} style={{fontStyle:'italic'}}>
                            {item.name}
                        </div>
                        <div aria-label={`value`} style={{fontWeight: "bolder", fontSize: "4rem", display: "flex", justifyContent: 'flex-start', padding: "0 0.5rem"}} data-testid = {item.dataTestID}>
                            {item.value}
                        </div>
                    </div>
                })
            }
        </div>
    )
}

type lapDisplayProps = {
    laps: number[][]
}

/**
 * This is a component that renders the LapTable.
 *
 * @export
 * @param {lapDisplayProps} props - The properties passed to this component.
 * @param {number} props.laps - The array that stores the lapTime and the total time elapsed for each lap
 *
 * @returns A JSX element that displays the hours, minutes, seconds, and milliseconds of the lap time and total time elapsed for each lap in a tabular format. 
 */
export const LapTable = (props: lapDisplayProps) => {
    let {laps} = props;
    type lapTableRender = {
        lapNum: number,
        curTime: string,
        totalTime: string
    }
    if(laps.length>0){
        let render: lapTableRender[] = []
        laps.slice().reverse().map((lap, index) =>{
            let {hours: curH, minutes: curM, seconds: curS, ms: curMs} = getTime(lap[0]) 
            let {hours: totalH, minutes: totalM, seconds: totalS, ms: totalMs} = getTime(lap[1]) 
            render.push({
                lapNum: laps.length-index,
                curTime: `${curH.toString().padStart(2, '0')}:${curM.toString().padStart(2, '0')}:${curS.toString().padStart(2, '0')}:${curMs.toString().padStart(2, '0')}`,
                totalTime: `${totalH.toString().padStart(2, '0')}:${totalM.toString().padStart(2, '0')}:${totalS.toString().padStart(2, '0')}:${totalMs.toString().padStart(2, '0')}`
            })
        })
        return(
            <Table responsive cellPadding={'2rem'} style={{minWidth: "60vw"}}>
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>Lap #</th>
                        <th style={{textAlign: "center"}}> Lap Time</th>
                        <th style={{textAlign: "center"}}>Total Time</th>
                    </tr>
                </thead>
                <tbody  data-testid={'lap-list'}>
                    {render.map(item => {
                        return(
                            <tr key={item.lapNum} aria-label={`LapRow:${item.lapNum}`}>
                                <td align='center' style={{padding: "1rem"}} aria-label={`LapNum`}>
                                    {item.lapNum}
                                </td>
                                <td align='center' style={{padding: "1rem"}} aria-label={`curTime`}>
                                    {item.curTime}
                                </td>
                                <td align='center' style={{padding: "1rem"}} aria-label={`totalTime`}>
                                    {item.totalTime}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }
}