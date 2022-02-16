import style from "./ManyDays.module.css"
import React, {useState} from "react";
import { DatePicker, Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker;

function ManyDays (){
    const [range, setRange] = useState([]);

    const onChange = (value, dateString) => {
        setRange(dateString)
    }

    const onOk = () => {
        console.log(range);
    }

    return (
        <div className={style.container}>
            <RangePicker onChange={onChange}/>
            <Tooltip title="search">
                <Button onClick={onOk} type="primary" shape="circle" icon={<SearchOutlined />} size="large" />
            </Tooltip>
        </div>
    );
}

export default ManyDays;