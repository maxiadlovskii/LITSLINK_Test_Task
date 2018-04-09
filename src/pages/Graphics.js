import React, {Component} from 'react';
import {DatePicker} from 'antd'
import PropTypes from 'prop-types';
import {LineChart,BarChart, Bar, CartesianGrid, XAxis,YAxis,Tooltip, Legend,Line} from 'recharts'
import {mapToArr, unique} from '../helpers'
const { RangePicker } = DatePicker;
class Graphics extends Component {
    onChangeDatePicker = (value, dateString) => {
        //filtrateDate, filtrateComment, filtrateType
        const from = (value[0]) ? value[0]._d : null;
        const to = (value[1]) ? value[1]._d : null;
        console.log( from, to)
        this.props.filtrateDateGraph({
            from: from,
            to: to})

    };
    onOkDatePicker = (value) => {
        console.log('onOkDatePicker', value)
    }
    generateData = () => {
        const data = this.props.costGraphList;
        const dataTypes = mapToArr(this.props.costType.entities)
        const allTypes = unique(data, 'type');
        console.log( allTypes )
        return allTypes.map(type=>{
            const currentType = dataTypes.filter(item=>item.id==type)[0]
            const isIncome = currentType.income;
            let income, expense
            if(isIncome){
                 income = data.filter(item=>item.type == type).map(item=>+item.sum).reduce(function(sum, current) {
                    return sum + current;
                }, 0);

            } else {

                    expense = data.filter(item=>item.type == type).map(item=>+item.sum).reduce(function(sum, current) {
                    return sum + current;
                }, 0);
            }



            const name = currentType.name;


            return {name: name, expense: expense,  income: income}
        })


    }
    render() {

            const data = this.generateData();
        return (
            <div>
                <h5>{'Date filter:'}</h5>
                <RangePicker
                    style={{ width: '50%' }}
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD HH:mm"
                    onChange={this.onChangeDatePicker}
                    onOk={this.onOkDatePicker}
                />
                <br/>
                <BarChart width={730} height={250} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="income" fill="#8884d8" />
                    <Bar dataKey="expense" fill="#ff0000" />
                </BarChart>
            </div>
        );
    }
}

Graphics.propTypes = {};
Graphics.defaultProps = {};

export default Graphics;
