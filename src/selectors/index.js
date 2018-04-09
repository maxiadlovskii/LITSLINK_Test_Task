import {createSelector} from 'reselect'
import {mapToArr} from '../helpers'
const filterGraphsGetter = state => state.filterGraphs
const filtersGetter = state => state.filters
const costsGetter = state => state.costs.entities


export const filtratedCostsSelector = createSelector(costsGetter, filtersGetter, (costs, filters) => {
    const {selected, dateRange: {from, to}, comment} = filters

    return mapToArr(costs).filter(cost => {
        console.log( "FILTRAAARTE ", cost.comment.toLowerCase() )
        console.log( comment.toLowerCase() )

        const published = Date.parse(cost.date)
        return (!selected.length || selected.includes(cost.type)) &&
            (!from || !to || (published > from && published < to)) && (!comment.length || cost.comment.toLowerCase().indexOf(comment.toLowerCase()) !== -1)
    })
})

export const filtratedCostsGraphSelector = createSelector(costsGetter, filterGraphsGetter, (costs, filterGraphs) => {
    const { dateRangeGraph: {from, to}} = filterGraphs
    return mapToArr(costs).filter(cost => {
        const published = Date.parse(cost.date)
        return (!from || !to || (published > from && published < to))
    })
})