import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Form, InputNumber, Input, Button, Row, Col, Select, DatePicker } from 'antd';
const FormItem = Form.Item;
const { Option} = Select
class AddCostForm extends Component {
    state = {
        number: {
            value: 0,
        },
    };
    handleNumberChange = (value) => {
        this.setState({
            number: {
                ...this.validatePrimeNumber(value),
                value,
            },
        });
    }
    validatePrimeNumber = (number) =>{
        if (number >= 0) {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        } else if(!number){
            return {
                validateStatus: 'error',
                errorMsg: 'You should input sum',
            };
        } else  return {
            validateStatus: 'error',
            errorMsg: 'The sum should be more or equal 0',
        };
    }
    hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    check = () => {
        const {form, addCost} = this.props
        form.validateFields(
            (err) => {
                if (!err) {
                    const costInfo = {
                        comment: form.getFieldsValue().comment,
                        date: form.getFieldsValue().date,
                        type: form.getFieldsValue().type,
                        sum: form.getFieldsValue().sum,

                    };
                    addCost( costInfo )
                }
            },
        );
    }
    render() {
        const number = this.state.number;
        const errType = 'You should choose type';
        const errComment = 'You should input some comment';
        const errDate = 'You should input type date'
        const sumErr = 'You should input sum'
        const { getFieldDecorator, getFieldsError } = this.props.form;
        const {costTypeData, iconPrefix} = this.props;
        const optionList = costTypeData.map(item=><Option key = {item.id} name = {item.name} value={item.id}><span><i className={iconPrefix+item.name}/><span>{item.name}</span></span></Option>)
        return (
            <Form className={'costForm'} layout="inline" >
                <Row>
                    <Col span={6}>
                        <FormItem
                        >
                            {getFieldDecorator('date', {
                                rules: [{ required: true,  message: errDate}],
                            })(
                                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                            )}

                        </FormItem>
                    </Col>

                    <Col span={6}>
                        <FormItem
                        >
                            {getFieldDecorator('type', {
                                rules: [{ required: true,  message: errType}],
                            })(
                                <Select
                                   style={{width: 200}}
                                    placeholder={'Set type'}
                                    showSearch
                                    filterOption={(input, option) => {
                                        console.log( option.props)
                                        return option.props.name.toLowerCase().indexOf(input.toLowerCase()) >= 0}}
                                >
                                    {optionList}
                                </Select>
                            )}

                        </FormItem>
                    </Col>
                    <Col span={6}>

                        <FormItem
                        >
                            {getFieldDecorator('comment', {
                                rules: [{ required: true, message: errComment}],
                            })(
                                <Input  placeholder={'Input some comment'}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={4}>
                        <FormItem
                                  validateStatus={number.validateStatus}
                                  help={number.errorMsg}
                        >
                            {getFieldDecorator('sum', {
                                rules: [{ required: true, message: sumErr}],
                            })(
                                <InputNumber
                                    min={0}
                                    style={{minWidth: '150px'}}
                                    onChange={this.handleNumberChange}
                                />
                            )}

                        </FormItem>
                    </Col>
                    <Col span={2}>
                        <FormItem>
                            <Button
                                type="primary"
                                onClick={this.check}
                                disabled={this.hasErrors(getFieldsError())}
                            >
                                Add
                            </Button>
                        </FormItem >
                    </Col>
                </Row>
            </Form>

        );
    }
}

const WrappedAddCostForm = Form.create()(AddCostForm);
export default WrappedAddCostForm;
