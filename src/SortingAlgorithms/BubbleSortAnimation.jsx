export function BubbleSortAnimation(array) {
  //copy original array to a temporary array
  const temp = array.slice();
  const animations = [];
  bubbleSort(array.length, animations, temp);
  return animations;
}

function bubbleSort(n, animations, temp) {
  let i = 0;
  let j = 0;

  for (i = 0; i < n - 1; i++) {
    for (j = 0; j < n - i - 1; j++) {
      if (temp[j] > temp[j + 1]) {
        //These are the values we are comparing
        animations.push([j, temp[j + 1]]);
        //swap
        var t = temp[j + 1];
        temp[j + 1] = temp[j];
        temp[j] = t;
        //These are the values we are comparing
        animations.push([j + 1, temp[j + 1]]);
      } else {
        animations.push([j, temp[j]]);
        animations.push([j + 1, temp[j + 1]]);
      }
    }
  }
  /*
  for (i = 0; i < n; i++) {
    console.log(array[i]);
  }
  console.log("\n");*/
  /*
  for (i = 0; i < n; i++) {
    //console.log(temp[i]);
    animations.push(temp[i]);
  }*/
  return animations;
}
