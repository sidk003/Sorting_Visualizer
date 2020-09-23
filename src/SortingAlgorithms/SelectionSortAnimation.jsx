export function SelectionSortAnimation(array) {
  const temp = array.slice();
  const animations = [];
  selectionSort(array.length, temp, animations);
  return animations;
}

function selectionSort(n, temp, animations) {
  var i,
    j,
    min,
    tempVariable = 0;

  for (i = 0; i < n - 1; i++) {
    min = i;
    for (j = i + 1; j < n; j++) {
      if (temp[j] < temp[min]) {
        min = j;
      }
    }
    animations.push([i, temp[i]]);
    animations.push([min, temp[min]]);

    tempVariable = temp[i];
    temp[i] = temp[min];
    temp[min] = tempVariable;

    animations.push([i, temp[i]]);
    animations.push([min, temp[min]]);
  }
  return animations;
}
