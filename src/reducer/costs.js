import {
    FAIL,
    SUCCESS,
    START,
    LOAD_COSTS,
    DELETE_TYPE_AND_COSTS, DELETE_COST,ADD_COST
} from '../constants'
import {arrToMap} from "../helpers";
import {OrderedMap,  Record} from 'immutable'

const CostsRecord = Record({
    id: '',
    comment: '',
    type: '',
    date: '',
    sum: 0

})
const ReducerState = Record({
    loading: false,
    loaded: false,
    entities: new OrderedMap({})
})

const defaultState = new ReducerState();
export default (state = defaultState, action)=>{
    const {type, payload, response, randomId, error} = action
    switch (type){
        case LOAD_COSTS + START:
            return state
                .set('loading', true);
        case LOAD_COSTS + SUCCESS:
            return state
                .set( 'entities', arrToMap(response, CostsRecord)  )
                .set('loading', false);
        case DELETE_TYPE_AND_COSTS:
            return state
                .upadate('entities', costs=>costs.filters(item=>item.type !== payload.typeId))
        case DELETE_COST:
            return state.deleteIn(['entities', payload.costId]);
        case ADD_COST:
            return state.setIn(['entities', randomId], new CostsRecord({...payload.costInfo, id: randomId}));
    }
    return state
}