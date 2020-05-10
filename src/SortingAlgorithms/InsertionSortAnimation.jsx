export function InsertionSortAnimation(array) {
  const temp = array.slice();
  const animations = [];
  insertionSort(array.length, temp, animations);
  return animations;
}

function insertionSort(n, temp, animations) {
  let key;
  let j;
  for (let i = 1; i < n; i++) {
    key = temp[i];
    j = i - 1;
    while (j >= 0 && temp[j] > key) {
      temp[j + 1] = temp[j];
      j--;
    }

    temp[j + 1] = key;
    animations.push([j + 1, temp[j + 1]]);
    //console.log(j + 1);
  }
}
