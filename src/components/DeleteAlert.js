import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button,  Modal} from 'antd'
class DeleteAlert extends Component {
    state= {
        showDeleteAlert: false
    }

    handleDelete(e){
        this.setState({
            showDeleteAlert: true
        })
    }
    actionDelete(e, typeId, deleteAll){
        const {deleteOnlyType, deleteTypeAndCosts} = this.props;
        console.log(typeId)
        if(deleteAll){deleteTypeAndCosts(typeId)}
        else {
            deleteOnlyType(typeId)
        }

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
        const {recordId, recordName} = this.props
        return (
            <div>
                <Button onClick={(e)=>{this.handleDelete(e)}}>Delete</Button>
                <Modal
                    visible={this.state.showDeleteAlert}
                    onCancel={this.closeModal}
                    footer={
                        <div>
                            <Button onClick={this.closeModal} type={'normal'}>{'Cancel'}</Button>
                            <Button onClick={(e) => this.actionDelete(e, recordId)} type={'danger'} ghost>{'Only type'}</Button>
                            <Button onClick={(e) => this.actionDelete(e, recordId, true)} type={'danger'}>{'Type and costs'}</Button>
                        </div>
                    }
                >
                    <div>
                        <p>{`Do you really wont delete ${recordName} ?`}</p>
                        <p>{`You can also delete all you costs which have type  ${recordName} or only delete type`}</p>
                    </div></Modal>
            </div>

        );
    }
}

DeleteAlert.propTypes = {};
DeleteAlert.defaultProps = {};

export default DeleteAlert;
