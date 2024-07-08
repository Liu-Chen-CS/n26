import {AddCircleOutline, BillOutline, CalculatorOutline} from "antd-mobile-icons";

export const useTabs = ()=>{
    const tabs = [
        {
            key: "/month",
            title: "Month",
            icon: <BillOutline/>
        },
        {
            key: "/new",
            title: "New",
            icon: <AddCircleOutline/>
        },
        {
            key: "/year",
            title: "Year",
            icon: <CalculatorOutline/>
        },
    ];
    return tabs;
}

