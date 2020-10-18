export function BubbleSortAnimation(array) {
  //copy original array to a temporary array
  const temp = array.slice();
  const animations = [];
  bubbleSort(array.length, animations, temp);
  return animations;
}

function bubbleSort(n, animations, temp) {
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i; j++) {
      if (temp[j] > temp[j + 1]) {
        //i and i+1 turn red before swap
        animations.push([temp[j], j, temp[j + 1], j + 1, "red"]);

        //swap
        var t = temp[j + 1];
        temp[j + 1] = temp[j];
        temp[j] = t;

        //i and i+1 turn to original color after swap
        animations.push([temp[j], j, temp[j + 1], j + 1, "cornflowerblue"]);
      }
    }
  }

  return animations;
}
