import React, {Component} from 'react';
import {mapToArr} from '../helpers'
import PropTypes from 'prop-types';
import {Row, Col} from 'antd'
import moment from 'moment'
import {Table} from 'antd'
import DeleteCostAlert from '../components/DeleteCostAlert'
import AddCostForm from '../components/AddCostForm'
import CostFilters from "../components/CostFilters";

class ShowCosts extends Component {
    getTotalValue = () => {
        const costTypeData = mapToArr(this.props.costType.entities);
        const {costsList} = this.props
        const costValues = costsList.map(cost=>{
            const isIncome = costTypeData.filter(type=>type.id == cost.type)[0].income
            if(isIncome) {return +cost.sum}
            else return -cost.sum
        })
        const sum = costValues.reduce(function(sum, current) {
            return sum + current;
        }, 0);
        if(sum >=0){
            return <span className={'sumPositive'}>{sum}</span>
        } else  return <span className={'sumNegative'}>{sum}</span>
    }
    render() {
        const {iconPrefix} = this.props.costType;
        const costTypeData = mapToArr(this.props.costType.entities)
        const {deleteCost, addCost, costsList} = this.props

      //  const {addCostType, deleteOnlyType, deleteTypeAndCosts} = this.props
        const columns = [
            { title: 'Date', width: 300, dataIndex: 'date', className: 'row200', key: `date`, render: (record) => moment(record).format('MMMM Do YYYY, h:mm:ss a') },
            { title: 'Type', width: 300, dataIndex: 'type', className: 'row100',key: `type`, render: (record) => {
                console.log( record)

                const currentType = costTypeData.filter(type=>type.id == record)[0]
                return <span><i className={iconPrefix+currentType.icon} /><span>{currentType.name}</span></span> }},
            { title: 'Comment', width: 300, dataIndex: 'comment', className: 'row200', key: `comment` },
            { title: 'Sum', width: 200, dataIndex: 'sum', className: 'row200', key: `sum`, render(record, row){
                const currentType = costTypeData.filter(type=>type.id == row.type)[0]
                console.log(  currentType.income) ;
                if(currentType.income){
                    return <span className={'income-sum'}>{record}</span>
                } else return <span className={'expense-sum'}>{`- ${record}`}</span>
            }},

            { title: ' ', width: 100, dataIndex: '', className: 'row100',key: `x`, render: (record) => <DeleteCostAlert
                deleteCost={(costId)=>deleteCost(costId)}
                recordId = {record.id}
                comment = {record.comment}
            />

            }

        ];
        return (
            <div>
                <CostFilters {...this.props}/>
                <h3>{'My Income / Expense: '}</h3>
                <Table
                    rowKey={'id'}
                    columns={columns}
                    dataSource={costsList}
                    footer={() =><div>
                        <Row>
                            <Col span={12}>
                            </Col>
                            <Col span={6}>
                                {'Total: '}
                            </Col>
                            <Col span={4}>
                                {this.getTotalValue()}
                            </Col>
                            <Col span={2}>
                            </Col>
                        </Row>
                        <AddCostForm addCost = {(costInfo)=> addCost(costInfo)} costTypeData = {costTypeData} iconPrefix = {iconPrefix}/>
                    </div> }
                    scroll={{y: 500, x: 500}}
                    pagination={false}
                />
            </div>
        );

    }
}

ShowCosts.propTypes = {};
ShowCosts.defaultProps = {};

export default ShowCosts;
