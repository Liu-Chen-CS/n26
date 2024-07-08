import "./index.scss";
import {Outlet, useNavigate} from "react-router-dom";
import {TabBar} from "antd-mobile";
import {AddCircleOutline, BillOutline, CalculatorOutline} from "antd-mobile-icons";
import {useEffect} from "react";
import {fetchBillList} from "../../store/slices/billList";
import {useTabs} from "./pure";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store";

const Layout = ()=>{
    const navigate = useNavigate();
    const tabs = useTabs();
    const dispatch:AppDispatch = useDispatch();
    function tabSwitch(key:string) {
        key === "/month" ? navigate("/") : navigate(key);
    }

    useEffect(()=>{
        dispatch(fetchBillList());
    })

    return(
        <div className="layout">
            <div className="content">
                <Outlet></Outlet>
            </div>
            <div className="searchBar">
                <TabBar onChange={tabSwitch}>
                    {tabs.map(item => {
                        return (<TabBar.Item key={item.key} icon={item.icon} title={item.title}/>)
                    })}
                </TabBar>
            </div>
        </div>
    );
}

export default Layout;