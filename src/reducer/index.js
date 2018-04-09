import { combineReducers } from 'redux'
import costType from './costType'
import costs from './costs'
import filters from './filters'
import filterGraphs from './filterGraphs'

export  default combineReducers({
    filterGraphs,
    filters,
    costType,
    costs
})

