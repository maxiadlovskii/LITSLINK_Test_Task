import React, {Component} from 'react'
import {loadCosts, loadCostTypes, loadFontConfig, addCostType,
    deleteOnlyType, deleteTypeAndCosts, deleteCost, addCost,
    filtrateDate, filtrateComment, filtrateType, filtrateDateGraph} from '../AC'
import {connect} from 'react-redux'
import 'antd/dist/antd.css'
import '../css/style.css'
import '../fonts/css/fontello.css'
import {Layout, LocaleProvider } from 'antd'
import uk_UA from 'antd/lib/locale-provider/uk_UA';
import { withRouter, BrowserRouter as Router } from "react-router-dom"
import Pages from '../pages'
import Sidebar from './Sidebar'
import Loader from "./Loader";
import moment from 'moment'
import {filtratedCostsSelector, filtratedCostsGraphSelector} from '../selectors'
moment.locale('uk');
const {Sider, Content} = Layout

class App extends  Component{
    static propTypes = {
    };
    startGettingData = () => {
        const {loadFontConfig} = this.props
        return new Promise(function(resolve, reject) {
            loadFontConfig();
            resolve();
        });

    }
    componentDidMount() {
        const { loadCostTypes, loadCosts} = this.props
                this.startGettingData()
                    .then(_=>{loadCosts();})
                    .then(_=>{loadCostTypes()})

    }

    render(){
        const pathname = this.props.location.pathname.replace(/[.\/\\]/g,"");
        const costs = this.props.costs
        const costType = this.props.costType
        if(costs.loading || costType.loading || costType.loadingConfig) return <Loader/>
        return(
            <LocaleProvider locale={uk_UA}>
            <Layout style={{minHeight: '100vh'}}>
                <Sider >
                <Sidebar pathname={pathname}/>
                </Sider>
                <Layout>
                    <Content>
                      <Pages pathname={pathname} {...this.props}/>
                    </Content>
                </Layout>
            </Layout>
                </LocaleProvider>
                )
    }
}



export  default withRouter( connect(
    (state)=> {
        return {

            costs: state.costs,
            costsList: filtratedCostsSelector(state),
            costGraphList: filtratedCostsGraphSelector(state),
            costType: state.costType
        }
    }, {
    loadCosts,
    loadCostTypes,
    loadFontConfig,
    addCostType,
    deleteOnlyType,
    deleteTypeAndCosts,
    deleteCost,
    addCost,
    filtrateDate,
    filtrateComment,
    filtrateType,
    filtrateDateGraph
    })(App) )