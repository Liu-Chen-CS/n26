import "./index.scss";
import {BillType} from "../../store/slices/billList";
import Category from "../category/Category";
import {useState} from "react";

type Props = {
    selectTime?: string;
    billList: BillType[];
    date: string;
}
const Daybill = (props: Props) => {
    const iconUp = {
        width: "0px",
        height: "0px",
        borderTop: "10px solid transparent",
        borderRight: "10px solid transparent",
        borderBottom: "10px solid red",
        borderLeft: "10px solid transparent",
    }

    const iconDown = {
        width: "0px",
        height: "0px",
        borderTop: "10px solid red",
        borderRight: "10px solid transparent",
        borderBottom: "10px solid transparent",
        borderLeft: "10px solid transparent",
    }
    const {selectTime, billList, date} = props;
    const [visible, setVisible] = useState<boolean>(false);
    const payRes = billList.reduce((a: BillType[], c: BillType) => {
        if (c.type === "pay") {
            a.push(c);
        }
        return a;
    }, []).reduce((a: number, c: BillType) => {
        return a += c.money;
    }, 0);

    const incomeRes = billList.reduce((a: BillType[], c: BillType) => {
        if (c.type === "income") {
            a.push(c);
        }
        return a;
    }, []).reduce((a: number, c: BillType) => {
        return a += c.money;
    }, 0);

    return (
        <div className="daybill">
            <div className="upper-daybill">
                <div>{date}</div>
                <div className="arrow"
                     onClick={() => {
                    setVisible(!visible);}}
                >
                    <div className="icon" style={visible? iconDown : iconUp}></div>
                </div>

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
            <hr/>
            {
                billList.map((item: BillType) => {
                    return (
                        <Category visibility={visible}
                                  key={item.id}
                                  category={item.useFor}
                                  money={item.money}></Category>
                    );
                })
            }
        </div>
    );
}
export default Daybill;