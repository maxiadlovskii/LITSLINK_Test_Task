import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Form, InputNumber, Input, Button, Row, Col, Select } from 'antd';
const FormItem = Form.Item;
const { Option} = Select
class AddTypeForm extends Component {
    hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    check = () => {
        const {form, addCostType} = this.props
        form.validateFields(
            (err) => {
                if (!err) {
                    const typeInfo = {
                        name: form.getFieldsValue().name,
                        icon: form.getFieldsValue().icon,
                        income: form.getFieldsValue().income
                    };
                    addCostType( typeInfo )
                }
            },
        );
    }
    render() {
        const errIcon = 'You should choose icon';
        const errName = 'You should input type name';
        const errIncome = 'You should choose income or expense'
        const { getFieldDecorator, getFieldsError } = this.props.form;
        const {config, iconPrefix} = this.props;
        const optionList = config.map(item=><Option key = {item.uid} value={item.css}><span><i className={iconPrefix+item.css}/></span></Option>)
        return (
            <Form layout="inline" >
                <Row>

                    <Col span={4}>
                        <FormItem style={{padding: '5px'}}
                            >
                            {getFieldDecorator('icon', {
                                rules: [{ required: true,  message: errIcon}],
                            })(
                                <Select
                                    dropdownClassName = {'iconContainer'} style={{width: 100}}
                                    placeholder={'Set icon'}
                                    showSearch
                                    filterOption={(input, option) => {
                                        console.log( option.props)
                                        return option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}}
                                >
                                    {optionList}
                                </Select>
                            )}

                        </FormItem>
                    </Col>
                    <Col span={8}>

                        <FormItem
                          >
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: errName}],
                            })(
                                <Input  placeholder={'Input type name'}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem style={{padding: '5px'}}
                        >
                            {getFieldDecorator('income', {
                                rules: [{ required: true,  message: errIncome}],
                            })(
                                <Select
                                    style={{width: 200}}
                                    placeholder={'Set income pr expense'}
                                >
                                    <Option value={true}>Income</Option>
                                    <Option value={false}>Expense</Option>
                                </Select>
                            )}

                        </FormItem>
                    </Col>
                    <Col span={4}>
                        <FormItem style={{padding: '5px'}}>
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

const WrappedAddTypeForm = Form.create()(AddTypeForm);
export default WrappedAddTypeForm;
