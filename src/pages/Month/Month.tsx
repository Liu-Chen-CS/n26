import "./index.scss";
import Stats from "../../components/Stats/Stats";
import {useState} from "react";

const Month = () => {
    const [psw, setPsw] = useState<string>("");
    const [pswValue, setPswValue] = useState<string>("");
    const handlePsw = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputVal:string = e.target.value;
        if(inputVal.length < 3 && inputVal.length > 0){
            setPswValue("password is too short")
        }
        else if(inputVal.length > 15){
            setPswValue("password is too long");
        }
        else{
            setPswValue("perfect!");
        }
        setPsw(inputVal);
    }

    return (
        <div className="monthlyBill">
            {/*Stats components*/}
            <Stats name={"month"}></Stats>
            {/*DailyBill*/}
            <div className="content">
                <div className="left">1</div>
                <div className="middle">
                    <form>
                        <fieldset>
                            <legend>Main Info</legend>
                            <label>
                                id: <input type="text" name="name"/>
                            </label><br/>
                            <label>
                                password:
                                <input type="password" name="psw" value={psw} onChange={handlePsw}/>
                                <span>{pswValue}</span>
                            </label><br/>
                        </fieldset>
                        <fieldset>
                            <legend>Sub Info</legend>
                            gender:
                            <label>
                                <input type="radio" name="gender" value="male"/>Male
                            </label>
                            <label>
                                <input type="radio" name="gender" value="female"/>Female
                            </label><br/>
                            Hobby:
                            <label>
                                <input type="checkbox" name="hobby" value="apple"/>Apple
                            </label>
                            <label>
                                <input type="checkbox" name="hobby" value="Samsung"/>Samsung
                            </label>
                            <label>
                                <input type="checkbox" name="hobby" value="Huawei"/>Huawei
                            </label><br/>
                            City:
                            <select name="select">
                                <option value="01">重庆</option>
                                <option value="02">成都</option>
                                <option value="03">上海</option>
                            </select>
                        </fieldset>
                        Additional info:
                        <textarea name="textarea" cols={10} rows={10}></textarea><br/>
                        <input type="reset" value="reset"/>
                        <input type="submit" value="submit"/>
                    </form>
                </div>
                <div className="right">3</div>
            </div>
        </div>
    );
}
export default Month;
