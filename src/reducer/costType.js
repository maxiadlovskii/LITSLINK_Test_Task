import {
    FAIL,
    SUCCESS,
    START,
    LOAD_FONT_CONFIG,
    LOAD_COST_TYPES,
    ADD_COST_TYPE,
    DELETE_ONLY_TYPE,
    DELETE_TYPE_AND_COSTS
} from '../constants'
import {arrToMap} from "../helpers";
import {OrderedMap,  Record} from 'immutable'

const CostTypeRecord = Record({
    id: '',
    name: '',
    icon: '',
    income: false


})
const ReducerState = Record({
    loading: false,
    loaded: false,
    loadingConfig: false,
    config: [],
    iconPrefix: '',
    entities: new OrderedMap({})
})

const defaultState = new ReducerState();
export default (state = defaultState, action)=>{
    const {type, payload, response, randomId, error} = action
    switch (type){
        case LOAD_FONT_CONFIG + START:
            return state
                .set('loadingConfig', true);
        case LOAD_COST_TYPES + START:
            return state
                .set('loading', true);
        case LOAD_COST_TYPES + SUCCESS:
            return state
                .set( 'entities', arrToMap(response, CostTypeRecord)  )
                .set('loading', false);
        case LOAD_FONT_CONFIG + SUCCESS:
            return state
                .set('iconPrefix', response.css_prefix_text)
                .set('config', response.glyphs)
                .set('loadingConfig', false);
        case ADD_COST_TYPE:
            return state.setIn(['entities', randomId], new CostTypeRecord({...payload.typeInfo, id: randomId}));
        case DELETE_ONLY_TYPE:
            return state.deleteIn(['entities', payload.typeId]);
        case DELETE_TYPE_AND_COSTS:
            return state.deleteIn(['entities', payload.typeId]);

    }
    return state
}