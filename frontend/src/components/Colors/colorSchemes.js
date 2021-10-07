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


export function reds(){
    let colorArray1 = []
    let colorArray2 = []
    let num = 0
    for(let i = 0; i < 10; i++){
        colorArray1.push(`rgba(${Math.round(num)}, 0, 0, 1.00)`)
        colorArray2.push(`rgba(255, ${Math.round(num)}, ${Math.round(num)}, 1.00)`)
        num += 25
    }
    return [...colorArray1, ...colorArray2]
}


export function greens(){
    let colorArray1 = []
    let colorArray2 = []
    let num = 0
    for(let i = 0; i < 10; i++){
        colorArray1.push(`rgba(0, ${Math.round(num)}, 0, 1.00)`)
        colorArray2.push(`rgba(${Math.round(num)}, 255, ${Math.round(num)}, 1.00)`)
        num += 25
    }
    return [...colorArray1, ...colorArray2]
}


export function blues(){
    let colorArray1 = []
    let colorArray2 = []
    let num = 0
    for(let i = 0; i < 10; i++){
        colorArray1.push(`rgba(0, 0, ${Math.round(num)}, 1.00)`)
        colorArray2.push(`rgba(${Math.round(num)},  ${Math.round(num)}, 255, 1.00)`)
        num += 25
    }
    return [...colorArray1, ...colorArray2]
}


export function yellows(){
    let colorArray1 = []
    let colorArray2 = []
    let num = 0
    for(let i = 0; i < 10; i++){
        colorArray1.push(`rgba(${Math.round(num)}, ${Math.round(num)}, 0, 1.00)`)
        colorArray2.push(`rgba(255, 255, ${Math.round(num)}, 1.00)`)
        num += 25
    }
    return [...colorArray1, ...colorArray2]
}


export function magentas(){
    let colorArray1 = []
    let colorArray2 = []
    let num = 0
    for(let i = 0; i < 10; i++){
        colorArray1.push(`rgba(${Math.round(num)}, 0, ${Math.round(num)}, 1.00)`)
        colorArray2.push(`rgba(255, ${Math.round(num)}, 255, 1.00)`)
        num += 25
    }
    return [...colorArray1, ...colorArray2]
}

export function cyans(){
    let colorArray1 = []
    let colorArray2 = []
    let num = 0
    for(let i = 0; i < 10; i++){
        colorArray1.push(`rgba(0, ${Math.round(num)}, ${Math.round(num)}, 1.00)`)
        colorArray2.push(`rgba(${Math.round(num)}, 255, 255, 1.00)`)
        num += 25
    }
    return [...colorArray1, ...colorArray2]
}
