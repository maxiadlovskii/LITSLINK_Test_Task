import {
    LOAD_COST_TYPES,
    LOAD_COSTS,
    LOAD_FONT_CONFIG,
    ADD_COST_TYPE,
    DELETE_TYPE_AND_COSTS,
    DELETE_ONLY_TYPE,
    DELETE_COST,
    ADD_COST,
    DATE_FILTER,
    COMMENT_FILTER,
    TYPE_FILTER,
    DATE_GRAPH_FILTER

} from '../constants'

export function loadCostTypes(){
    return {
        type: LOAD_COST_TYPES,
        callAPI: '/api/costtype'
    }
}

export function loadCosts(){
    return {
        type: LOAD_COSTS,
        callAPI: '/api/costs'
    }
}

export function loadFontConfig(){
    return {
        type: LOAD_FONT_CONFIG,
        callAPI: '/api/fontconfig'
    }
}

export function addCostType(typeInfo) {

    return {
        type: ADD_COST_TYPE,
        payload: {typeInfo},
        generateId: true
    }
}

export function deleteTypeAndCosts(typeId) {
    return {
        type: DELETE_TYPE_AND_COSTS,
        payload: {typeId}
    }

}

export function deleteOnlyType(typeId) {
    return {
        type: DELETE_ONLY_TYPE,
        payload: {typeId}
    }

}
export function deleteCost(costId) {
    return {
        type: DELETE_COST,
        payload: {costId}
    }

}

export function addCost(costInfo) {

    return {
        type: ADD_COST,
        payload: {costInfo},
        generateId: true
    }
}

export function filtrateDate(dateRange) {
    return {
        type: DATE_FILTER,
        payload: {dateRange}
    }
}

export function filtrateComment(comment) {
    return {
        type: COMMENT_FILTER,
        payload: {comment}
    }
}

export function filtrateType(selected) {
    return {
        type: TYPE_FILTER,
        payload: {selected}
    }
}

export function filtrateDateGraph(dateRangeGraph) {
    console.log(dateRangeGraph)
    return {
        type: DATE_GRAPH_FILTER,
        payload: {dateRangeGraph}
    }
}