import "./index.scss";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import dayjs from "dayjs";
import shanghai from "./shanghai.jpg";
import {BillType} from "../../store/slices/billList";
import {ReactEventHandler, useMemo, useState} from "react";
import Daybill from "../daybill/Daybill";

type Props = {
    name: "month" | "year";
}

type Accumulator = {
    [key: string]: BillType[];
}

const Stats = (props: Props) => {
    const [selectTime, setSelectTime] = useState("2024-07");
    const {name} = props;
    const {billList} = useSelector((state: RootState) => state.billList);
    const res = useMemo(() => {
        const grouped = billList.reduce((a: Accumulator, c: BillType) => {
            const yearMonth: string = c.date.substring(0, 7);
            if (!a[yearMonth]) {
                a[yearMonth] = [];
            }
            a[yearMonth].push(c);
            return a;
        }, {});
        return grouped;
    }, [billList]);

    const currentStats = useMemo(() => {
        const currentTime: string = selectTime;
        const pay: BillType[] = res[currentTime]?.filter((item: BillType) => item.type === "pay");
        const payStats: number = pay?.reduce((a: number, c: BillType) => {
            a += c.money;
            return a;
        }, 0)
        const income: BillType[] = res[currentTime]?.filter((item: BillType) => item.type === "income");
        const incomeStats = income?.reduce((a: number, c: BillType) => {

            a += c.money;
            return a;
        }, 0);
        return {payStats, incomeStats,currentTime,};
    }, [res, selectTime]);


    const dayGroup = res[selectTime]?.reduce((a:Accumulator, c:BillType)=> {
        const dayFormatted = c.date.substring(0, 10);
        if(!a[dayFormatted]){
            a[dayFormatted] = [];
        }
        a[dayFormatted].push(c);
        return a;
    }, {});

    let keySet:string[] = [];
    if(dayGroup)keySet = Object.keys(dayGroup);


    function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectTime(e.target.value);
    }

    return (
        <div className="container">
            <div className="header">Month</div>
            <div className="statsContent">
                <div className="date">{selectTime}<span></span></div>
                <ul className="numbers">
                    <li>Spent: <span>{currentStats.payStats}</span></li>
                    <li>Income: <span>{currentStats.incomeStats}</span></li>
                    <li>Balance: <span>{currentStats.payStats + currentStats.incomeStats}</span></li>
                </ul>
            </div>
            <div className="outer">
                <img src={shanghai}/>
                <div className="mask">上海</div>
            </div>
            <div>
                <form>
                    <select name="select" onChange={handleSelect}>
                        <option value="2024-07">2024-07</option>
                        <option value="2024-06">2024-06</option>
                    </select>
                </form>
            </div>
            {
                keySet.map((item:string)=>{return(
                    <Daybill key = {Math.random()} date={item} billList={dayGroup[item]}></Daybill>
                )})
            }
        </div>
    );
}

export default Stats;