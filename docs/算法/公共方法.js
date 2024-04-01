/**
 * 数组以指定顺序排序
 * array 要排序的数组
 * orderArray 顺序数组
 * return 按照 orderArray 数组顺序排列完成的 array
 * 
 */
const arraySortByOrder = (array,orderArray)=>{
    return array.sort((a,b)=>{
        return orderArray.indexOf(a) - orderArray.indexOf(b)
    })
}