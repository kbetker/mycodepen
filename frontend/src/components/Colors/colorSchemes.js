export const defaultColors = [
    "rgba(85, 0, 0, 1.00)",
    "rgba(170, 0, 0, 1.00)",
    "rgba(255, 0, 0, 1.00)",
    "rgba(0, 85, 0, 1.00)",
    "rgba(0, 170, 0, 1.00)",
    "rgba(0, 255, 0, 1.00)",
    "rgba(0, 0, 85, 1.00)",
    "rgba(0, 0, 170, 1.00)",
    "rgba(0, 0, 255, 1.00)",
    "rgba(85, 85, 0, 1.00)",
    "rgba(170, 170, 0, 1.00)",
    "rgba(255, 255, 0, 1.00)",
    "rgba(85, 0, 85, 1.00)",
    "rgba(170, 0, 170, 1.00)",
    "rgba(255, 0, 255, 1.00)",
    "rgba(0, 85, 85, 1.00)",
    "rgba(0, 170, 170, 1.00)",
    "rgba(0, 255, 255, 1.00)",
    "rgba(0, 0, 0, 1.00)",
    "rgba(255, 255, 255, 1.00)",
    ]


export function grayscale(){
    let colorArray1 = []
    let num = 0
    for(let i = 0; i < 20; i++){
        colorArray1.push(`rgba(${Math.round(num)}, ${Math.round(num)}, ${Math.round(num)}, 1.00)`)
        num += 13.4
    }
    return colorArray1
}

function returnArray (red, green, blue){
    let colorArray1 = []
    let colorArray2 = []
    let num = 0
    for(let i = 0; i < 10; i++){
        colorArray1.push(`rgba(${red ? Math.round(num) : 0}, ${green ? Math.round(num) : 0}, ${blue ? Math.round(num) : 0}, 1.00)`)
        colorArray2.push(`rgba(${!red ? Math.round(num) : 255}, ${!green ? Math.round(num) : 255}, ${!blue ? Math.round(num) : 255}, 1.00)`)
        num += 25
    }
    return [...colorArray1, ...colorArray2]
}


export const reds = () => returnArray(true, false, false);
export const greens = () => returnArray(false, true, false);
export const blues = () => returnArray(false, false, true);
export const yellows = () => returnArray(true, true, false);
export const magentas = () => returnArray(true, false, true);
export const cyans = () => returnArray(false, true, true);


export const skinTones = [
    "rgba(15, 8, 0, 1.00)",
    "rgba(46, 26, 2, 1.00)",
    "rgba(62, 34, 3, 1.00)",
    "rgba(93, 52, 4, 1.00)",
    "rgba(116, 65, 5, 1.00)",
    "rgba(139, 78, 7, 1.00)",
    "rgba(170, 95, 8, 1.00)",
    "rgba(194, 108, 9, 1.00)",
    "rgba(217, 121, 11, 1.00)",
    "rgba(240, 134, 12, 1.00)",
    "rgba(243, 146, 33, 1.00)",
    "rgba(244, 157, 56, 1.00)",
    "rgba(246, 169, 80, 1.00)",
    "rgba(247, 180, 103, 1.00)",
    "rgba(248, 192, 126, 1.00)",
    "rgba(249, 203, 150, 1.00)",
    "rgba(250, 214, 173, 1.00)",
    "rgba(252, 226, 196, 1.00)",
    "rgba(253, 237, 220, 1.00)",
    "rgba(254, 249, 243, 1.00)",
    ]
