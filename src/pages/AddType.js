import React, {Component} from 'react';
import {Button, Table, Modal} from 'antd'
import PropTypes from 'prop-types';
import {mapToArr} from "../helpers";
import AddTypeForm from '../components/AddTypeForm'
import DeleteAlert from "../components/DeleteAlert";

class AddType extends Component {


    render() {
        const {iconPrefix, config, entities} = this.props.costType;
        const {addCostType, deleteOnlyType, deleteTypeAndCosts} = this.props
        const columns = [
            { title: ' ', width: 100, dataIndex: 'icon', className: 'row100',key: `icon`, render: (record) => {
                return <span><i className={iconPrefix+record} /></span> }},
            { title: 'Name', width: 200, dataIndex: 'name', className: 'row200', key: `name` },
            { title: 'Income / Expense', width: 200, dataIndex: 'income', className: 'row200', key: `income`, render:(record)=>{
                if(record){
                    return <span>Income</span>
                } else return <span>Expense</span>
            } },
            { title: ' ', width: 100, dataIndex: '', className: 'row100',key: `x`, render: (record) => <DeleteAlert
                deleteTypeAndCosts={(typeId)=>deleteTypeAndCosts(typeId)}
                deleteOnlyType={(typeId)=>deleteOnlyType(typeId)}
                recordId = {record.id}
                recordName = {record.name}
            />

                  }

        ];
        return (
            <div>
                <Table
                    rowKey={'id'}
                    columns={columns}
                    dataSource={mapToArr(entities)}
                    footer={() =><AddTypeForm iconPrefix = {iconPrefix} config={config} addCostType = {(typeInfo)=>addCostType(typeInfo)}/> }
                    scroll={{y: 500, x: 500}}
                    pagination={false}
                />
            </div>
        );
    }
}

AddType.propTypes = {};
AddType.defaultProps = {};

export default AddType;
