import "./index.scss";
import Icon from "../icon/Icon";
type PropsType = {
    category: string,
    money: number,
    visibility: boolean;
}
const Category = (props:PropsType)=>{
    const {category, money, visibility} = props;
    return (
        <div className="outer" style={{display: visibility? "flex" : "none"}}>
            <div className="icon">
                <Icon></Icon>
                <div className="left">{category}</div>
            </div>
            <div className="right">{money}</div>
        </div>
    );
}
export default Category;