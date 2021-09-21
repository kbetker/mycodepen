let noAlpha = `rgb(0, 133, 255)`

let first = noAlpha.slice(0, 3)
let mid = noAlpha.slice(noAlpha.indexOf("("), noAlpha.indexOf(")"))
currColor =first + "a" + rgb + ", 1" + ")"
