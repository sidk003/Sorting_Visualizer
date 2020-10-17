export function QuickSortAnimation(array) {
  const temp = array.slice();
  const animations = [];
  quickSort(temp, 0, array.length - 1, animations);
  return animations;
}

function quickSort(temp, l, h, animations) {
  if (l < h) {
    //Last element taken as pivot
    let partitionIndex = partition(temp, l, h, animations);
    quickSort(temp, l, partitionIndex - 1, animations);
    quickSort(temp, partitionIndex + 1, h, animations);
  }
}

function partition(temp, l, h, animations) {
  let piv = temp[h],
    i = l - 1,
    j;

  //push pivot, also passing color from here makes it easy to understand
  animations.push([temp[h], h, 0, 0, "orange"]);

  for (j = l; j < h; j++) {
    if (temp[j] < piv) {
      i++;

      //swap
      animations.push([temp[j], j, temp[i], i, "red"]);

      let t = temp[j];
      temp[j] = temp[i];
      temp[i] = t;

      animations.push([temp[j], j, temp[i], i, "cornflowerblue"]);
    }
  }

  animations.push([temp[h], h, temp[i + 1], i + 1, "red"]);

  let t = temp[h];
  temp[h] = temp[i + 1];
  temp[i + 1] = t;

  animations.push([temp[h], h, temp[i + 1], i + 1, "cornflowerblue"]);

  //pivot back to normal
  animations.push([temp[h], h, 0, 0, "cornflowerblue"]);

  return i + 1;
}
