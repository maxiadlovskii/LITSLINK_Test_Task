import React, {Component} from 'react';
import {Button,  Modal} from 'antd'
import PropTypes from 'prop-types';

class DeleteCostAlert extends Component {
    state= {
        showDeleteAlert: false
    }

    handleDelete(e){
        this.setState({
            showDeleteAlert: true
        })
    }
    actionDelete(e, costId){
        const {deleteCost} = this.props;

        deleteCost(costId);
        this.setState({
            showDeleteAlert: false
        })
    }

    closeModal = () => {
        this.setState({
            showDeleteAlert: false
        })
    }
    render() {
        const {recordId, comment} = this.props
        return (
            <div>
                <Button onClick={(e)=>{this.handleDelete(e)}}>Delete</Button>
                <Modal
                    visible={this.state.showDeleteAlert}
                    onCancel={this.closeModal}
                    footer={
                        <div>
                            <Button onClick={this.closeModal} type={'normal'}>{'Cancel'}</Button>
                            <Button onClick={(e) => this.actionDelete(e, recordId)} type={'danger'}>{'Delete'}</Button>
                        </div>
                    }
                >
                    <div>
                        <p>{`Do you really wont delete ${comment} ?`}</p>
                      </div></Modal>
            </div>

        );
    }
}

DeleteCostAlert.propTypes = {};
DeleteCostAlert.defaultProps = {};

export default DeleteCostAlert;
