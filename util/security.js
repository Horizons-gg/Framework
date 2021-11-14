const { isStringObject } = require("util/types")

function XSSFilter(data) {
    if (!data) return false
    if (typeof data === 'string') return data.replace(/[<>]/g, '')
    if (typeof data === 'object') {
        for (key in data) {
            if (typeof data[key] === 'string') {
                data[key] = data[key].replace(/[<>]/g, '')
            }
        }
        return data
    }
    if (Array.isArray(data)) {
        data.forEach((item, index) => {
            if (isStringObject(item)) {
                data[index] = item.replace(/[<>]/g, '')
            }
        })
        return data
    }
    else return false
}



module.exports = {
    XSSFilter: XSSFilter
}