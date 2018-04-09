import React, {Component} from 'react';
import {Menu} from 'antd'
import {menuItems} from "../constants";
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';


class Sidebar extends Component {
    renderMenuList = () => {
        console.log( menuItems )
        const menu = menuItems.map(item=> {
            return <Menu.Item className={'menuItem'}key={item.link} >
            <Link className={"menuLink"} to={`/${item.link}/`}>
                <span className={"menuTitle"}>
               <i className={item.icon} /><span>{item.title}</span>
                </span>
            </Link>
                </Menu.Item>


        })

        return menu
    }

    componentDidMount() {
            console.log(this.props)
    }

    render() {
        const defaultSelectedKey = this.props.pathname || 'home'
        return (
            <div className={'sidebar'}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[defaultSelectedKey]}>
                {this.renderMenuList()}
            </Menu>
            </div>
        );
    }
}

Sidebar.propTypes = {};
Sidebar.defaultProps = {};

export default Sidebar;
