import "./index.scss";
import {BillType} from "../../store/slices/billList";

type Props = {
    selectTime?: string;
    billList:BillType[];
    date: string;
}
const Daybill = (props:Props)=>{
    const {selectTime, billList, date} = props;
    const payRes = billList.reduce((a:BillType[], c:BillType) => {
        if(c.type === "pay"){
            a.push(c);
        }
        return a;
    }, []).reduce((a:number, c:BillType)=>{
        return a += c.money;
    },0);

    const incomeRes = billList.reduce((a:BillType[], c:BillType) => {
        if(c.type === "income"){
            a.push(c);
        }
        return a;
    }, []).reduce((a:number, c:BillType)=>{
        return a += c.money;
    },0);

    return(
        <div className="daybill">
            <div className="upper-daybill">
                <div>{date}</div>
                <div>arrow</div>
            </div>
            <div className="under-daybill">
                <div>
                    <span>spent</span>
                    <span>{payRes}</span>
                </div>
                <div>
                    <span>income</span>
                    <span>{incomeRes}</span>
                </div>
                <div>
                    <span>{payRes + incomeRes}</span>
                    <span>total</span>
                </div>
            </div>
        </div>
    );
}
export default Daybill;