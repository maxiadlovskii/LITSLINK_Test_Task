import React, {Component} from 'react';
import {DatePicker, Select, Input} from 'antd'
import PropTypes from 'prop-types';
import {mapToArr} from '../helpers'
const { RangePicker } = DatePicker;
const Option = Select.Option
const Search = Input.Search;

class CostFilters extends Component {

    onChangeDatePicker = (value, dateString) => {
        //filtrateDate, filtrateComment, filtrateType
        const from = (value[0]) ? value[0]._d : null
        const to = (value[1]) ? value[1]._d : null
        this.props.filtrateDate({
            from: from,
            to: to})

    }

    onChangeTypeSelect = (value) => {
        console.log('onChangeTypeSelect', value)
        this.props.filtrateType(value)
    }
   onOkDatePicker = (value) => {
       console.log('onOkDatePicker', value)
    }
    onSearchComment = (e) => {
        console.log( 'onSearchComment', e.target.value)
        this.props.filtrateComment(e.target.value)
    }
    render() {
        const {iconPrefix, config } = this.props.costType;
        const costTypeData = mapToArr(this.props.costType.entities)
        const typeList = costTypeData.map(item=><Option key = {item.id} name = {item.name} value={item.id}><span><i className={iconPrefix+item.name}/><span>{item.name}</span></span></Option>)
        return (
            <div>
                <h3>{'Filters: '}</h3>
                <h5>{'Date filter:'}</h5>
                <RangePicker
                    style={{ width: '50%' }}
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD HH:mm"
                    onChange={this.onChangeDatePicker}
                    onOk={this.onOkDatePicker}
                />
                <br/>
                <h5>{'Type filter:'}</h5>
                <Select
                    mode="multiple"
                    style={{ width: '50%' }}
                    placeholder="Please select type"
                    onChange={this.onChangeTypeSelect}
                >
                    {typeList}
                </Select>
                <br/>
                <h5>{'Comment filter:'}</h5>
                <Search
                    placeholder="input search text for comment"
                    onChange={(e) => this.onSearchComment(e)}
                    style={{ width:'50%' }}

                />

            </div>
        );
    }
}

CostFilters.propTypes = {};
CostFilters.defaultProps = {};

export default CostFilters;
