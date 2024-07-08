import "./index.scss";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import dayjs from "dayjs";
import shanghai from "./shanghai.jpg";
import {BillType} from "../../store/slices/billList";
import {useMemo} from "react";

type Props = {
    name: "month" | "year";
}

type Accumulator = {
    [key: string]: BillType[];
}

const Stats = (props: Props) => {
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
        const currentTime: string = dayjs().format("YYYY-MM")
        const pay: BillType[] = res[currentTime]?.filter((item: BillType) => item.type === "pay");
        const payStats: number = pay?.reduce((a: number, c: BillType) => {
            a += c.money;
            return a;
        }, 0)
        const income: BillType[] = res[currentTime]?.filter((item: BillType) => item.type === "income");
        const incomeStats = income?.reduce((a: number, c: BillType) => {
            console.log(c.money);
            a += c.money;
            return a;
        }, 0);
        return {payStats, incomeStats,currentTime,};
    }, [res]);
    return (
        <div className="container">
            <div className="header">Month</div>
            <div className="statsContent">
                <div className="date">{currentStats.currentTime}<span></span></div>
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
        </div>
    );
}

export default Stats;