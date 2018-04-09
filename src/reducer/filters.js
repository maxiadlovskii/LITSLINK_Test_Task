import { DATE_FILTER, TYPE_FILTER, COMMENT_FILTER, DELETE_COST} from "../constants";
const defaultFilters = {
    selected: [],
    dateRange: {
        from: null,
        to: null
    },
    comment: ''
}

export default (filters = defaultFilters, action) =>{
    const {type, payload} = action
    switch (type){
        case DATE_FILTER:
            return {...filters, dateRange: payload.dateRange}
        case TYPE_FILTER:
            return {...filters, selected: payload.selected}

        case COMMENT_FILTER:
            return {...filters, comment: payload.comment}

        case DELETE_COST:
            return {...filters, selected: filters.selected.filter(id => id !== payload.costId)}
    }

    return filters
}