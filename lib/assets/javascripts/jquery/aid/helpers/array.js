window.isArray = function(obj){
    if(obj.constructor == Array)
        return true;
    return false;
}


// Array.prototype.compressed = (compress)->
//   _a = this
//   _new = []

//   _a.each (v)->
//     _new.push v unless v == compress || v == null || v == undefined

//   _new

// Array.prototype.without = (items)->
//   _a = this

//   if isString(items)
//     items = items.split(",")

//   items.each (v)->
//     _a = removeItem(_a, v.trim())

//   _a


// removeItem = (array, item)->
//   _new = []

//   array.each (v)->
//     _new.push v unless v == item

//   _new


// Array.prototype.eachUntil = (callback, condition)->
//   _a = this
//   i = 0
//   loop
//     callback _a.item(i), i
//     i++
//     break if condition
