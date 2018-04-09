import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect} from "react-router-dom";
import AddType from './AddType'
import Graphics from './Graphics'
import ShowCosts from './ShowCosts'
import {menuItems} from "../constants";
import Home from './home'
import Sidebar from '../components/Sidebar'

class index extends Component {
    render() {
        if(!menuItems.map(item=>item.link.replace(/[.\/\\]/g,"")).includes(this.props.pathname)) return <Redirect from = '/' to = '/home/'/>
        const props = this.props
        return (
            <div>
            <Switch>
                <Route exact path={'/home/'} component={Home}/>
                <Route exact path={'/addtype/'} render={routeProps => (<AddType {...routeProps} {...props}/>)}/>
                <Route exact path={'/showmycosts/'} render={routeProps => (<ShowCosts {...routeProps} {...props}/>)}/>
                <Route exact path={'/graphics/'}
                       render={routeProps => (<Graphics
                           {...routeProps}
                           costGraphList={this.props.costGraphList}
                           costType={this.props.costType}
                           filtrateDateGraph={(dateRangeGraph)=>this.props.filtrateDateGraph(dateRangeGraph)}
                       />)}
                />
            </Switch>
            </div>
        );
    }
}

index.propTypes = {};
index.defaultProps = {};

export default index;
