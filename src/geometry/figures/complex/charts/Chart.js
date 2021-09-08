import Group, { GroupDrawler } from "../../group/Group";

export default class Chart extends Group{
    constructor({x = 0,y = 0, data = []}, drawler = new GroupDrawler()) {
        super({x,y}, drawler);
        this.data = data;
    }

    __getDataFullValue(data) {
        return data.data.reduce((acc, item) => acc + item.value, 0)
    }

    pushData(newData) {
        return this.data.push(newData);
    }
} 