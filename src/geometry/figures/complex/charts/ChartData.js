/**
 * {
 *  title: String,
 *  data: Array<{
 *      distance: any,
 *      value: number,
 *  }>
 * }
 */

export default class ChartData {
    constructor({
        title = '',
        data = []
    }) {
        this.title = title;
        this.data = data;
    }
} 