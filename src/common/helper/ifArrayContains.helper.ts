import _ from "lodash"
import { json } from "stream/consumers"

export function ifArrayContains<T extends object>(array: T[], value: T): boolean {

    var result = false

    for (const item of array) {
        if (_.isEqual(item, value)) result = true
    }

    return result
}