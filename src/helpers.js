import {OrderedMap} from 'immutable'

export function arrToMap(arr, DataRecord = OrderedMap) {
    return arr.reduce((acc, item) =>
            acc.set(item.id, new DataRecord(item))
        , new OrderedMap({}))
}

export function mapToArr(obj) {
    return obj.valueSeq().toJS()
}

export function unique(arr, key) {
    var obj = {};

    for (var i = 0; i < arr.length; i++) {
        var str = (key) ? arr[i][key] : arr[i]
        obj[str] = true;
    }

    return Object.keys(obj);
}