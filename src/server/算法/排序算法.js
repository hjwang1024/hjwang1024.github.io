/*
排序
*/

//快排  时间复杂度：平均O(nlogn)，最坏O(n2)，实际上大多数情况下小于O(nlogn)

//空间复杂度:O(logn)（递归调用消耗）  不稳定
function quickSort(arr){
  if(arr.length<2){
    return arr
  }
  let tar = arr[0]
  let l = []
  let r = []
  for(let i=0;i<arr.length;++i){
    if(arr[i]<=tar){
      l.push(arr[i])
    }else{
      r.push(arr[i])
    }
  }
  return quickSort(l).concat([tar],quickSort(r))
}
function quickSort(array,start,end) {
  if(end-start<1){
    return
  }
  let tar = array[0] //基准值
  let left = start
  let right = end

  while(left<end){
    while(left<end && tar<=array[right]){
      end--
    }
    array[left] = array[end]  //交换位置
    while(left < end && tar>array[left]){
      start++
    }
    array[left] = array[right]


  }
  array[left] = tar

  quickSort(array,start,left-1)
  quickSort(array,left+1,end)

  return array
}

//冒泡 时间复杂度：O(n2)  空间复杂度:O(1)  稳定  把打的往后放
function bubbleSort(arr){
  for(let i = 0;i<arr.length;++i){
    let isComplete = true //如果本次没有发生交换 则证明冒泡完毕
    for(let j=0;j<arr.length-1;++j){
      if(arr[j]>arr[j+1]){
        [arr[j],arr[j+1]] = [arr[j+1],arr[j]]
        isComplete = false
      }
      if(isComplete){
        return arr
      }
    }
  }
}

//选择排序  时间复杂度：O(n2)   空间复杂度:O(1)  不稳定  把小的放到第一位
function selectionSort(arr){
  for(let i=0;i<arr.length;++i){
    let min = i
    for(let j=i+1;j<arr.length;++j){
      if(arr[j]<min){
        min = j
      }
    }
    [arr[i],arr[min]] = [arr[min],arr[i]]
  }
  return arr
}

function insertSort(arr){
  let length = arr.length
  for(let i=1;i<length;++i){
    let tar = i
    for(let j=i-1;j>=0;--j){
      if(arr[tar]<arr[j]){
        [arr[tar],arr[j]] = [arr[j],arr[tar]]
        tar = j //交换位置后 还要要和之前的数进行比较   tar要前移一位
      }else{
        break
      }
    }
  }
}

//归并排序  时间复杂度：O(nlogn) 空间复杂度:O(n) 稳定
function mergeSort(arr,left,right,temp){
  if(left<right){
    let mid = Math.floor((left+right)/2)
    mergeSort(arr,left,mid,temp)
    mergeSort(arr,mid+1,right,temp)
    merge(arr,left,right,temp)
  }
  return arr

}
function merge(arr,l,r,t){
  let mid = Math.floor((left+right)/2)
  let left = l
  let right = mid+1
  let temp = 0

  while(left<=mid && right<=r){
    if(arr[left]<arr[right]){
      t[temp++] = arr[left++]
    }else{
      t[temp++] = arr[right++]
    }
  }

  while(left<=mid){ //没走完的部分
    t[temp++] = arr[left++]
  }
  while(right<=r){//没走完的部分
    t[temp++] = arr[right++]
  }

  temp = 0

  for(let k=left;k<=right;++k){//重新赋值
    arr[k] = t[temp++]
  }
  

}
