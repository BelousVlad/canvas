export class Transform {

    constructor(obj, deltas = {}) {
        this.object = obj;
        this.deltas = deltas;
        this.__cache_start_values();
    }
    
    __cache_start_values() {
        this.cache = {};
        this.__cache_value(this.object, this.deltas, this.cache)
    }
    
    __cache_value(object ,values, cache) {
        for(let key in values) {
            const value = object[key];
            if(value === null || value === undefined)
            cache[key] = 0;
            else if (typeof value === 'object')
            {
                cache[key] = {};
                this.__cache_value(value, values[key], cache[key]);
            }
            else if(typeof value === 'number')
            cache[key] = value;
            else
            throw `Cant transform type ${typeof value}`;
        }
    }
    
    doTransfom(elapsed) {
        this.__do_transform(elapsed, this.object, this.deltas, this.cache);
    }
    
    __do_transform(elapsed, object, deltas, cache) {
        for(let key in cache) {
            const cached = cache[key];
            if(typeof cached === 'number')
            {
                // console.log(this.__get_elapsed_value(deltas[key], elapsed));
                object[key] = cached + this.__get_elapsed_value(deltas[key], elapsed);
            }
            else
                this.__do_transform(elapsed, object[key], deltas[key], cached)
        }
    }

    __get_elapsed_value(value, elapsed) {
        return value * elapsed;
    }
}