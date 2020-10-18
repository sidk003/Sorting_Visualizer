export function SelectionSortAnimation(array) {
  const temp = array.slice();
  const animations = [];
  selectionSort(array.length, temp, animations);
  return animations;
}

function selectionSort(n, temp, animations) {
  var min,
    tempVariable = 0;

  for (var i = 0; i < n - 1; i++) {
    min = i;
    for (var j = i + 1; j < n; j++) {
      //leftmost element to be compared has to be highlighted with orange
      animations.push([temp[i], i, 0, 0, "orange"]);

      //to blink element from left to right while searching for minimum element
      animations.push([temp[j], j, 0, 0, "red"]);
      animations.push([temp[j], j, 0, 0, "cornflowerblue"]);

      if (temp[j] < temp[min]) {
        //change the color of previously found minimum element back to blue color
        animations.push([temp[min], min, 0, 0, "cornflowerblue"]);
        min = j;
        //minimum element found, highlight it by orange color
        animations.push([temp[min], min, 0, 0, "orange"]);
      }
    }
    //swap the leftmost element with minimum element by highlighting once and changing back to blue
    animations.push([temp[i], min, temp[min], i, "orange"]);
    animations.push([temp[i], min, temp[min], i, "cornflowerblue"]);

    tempVariable = temp[i];
    temp[i] = temp[min];
    temp[min] = tempVariable;
  }
}
