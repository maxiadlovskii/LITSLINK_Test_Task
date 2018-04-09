import { DATE_GRAPH_FILTER} from "../constants";
const defaultFilters = {
    dateRangeGraph : {
        from: null,
        to: null
    }
}

export default (filters = defaultFilters, action) =>{
    const {type, payload} = action
    switch (type){
        case DATE_GRAPH_FILTER:
            return {...filters, dateRangeGraph: payload.dateRangeGraph}

    }

    return filters
}