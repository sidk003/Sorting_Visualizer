export function QuickSortAnimation(array) {
  const temp = array.slice();
  const animations = [];
  quickSort(temp, 0, array.length - 1, animations);
  return animations;
}

function quickSort(temp, l, h, animations) {
  if (l < h) {
    let piv = partition(temp, l, h, animations);
    quickSort(temp, l, piv - 1, animations);
    quickSort(temp, piv + 1, h, animations);
  }
}

function partition(temp, l, h, animations) {
  let piv = temp[h],
    i = l - 1,
    j;
  for (j = l; j < h; j++) {
    if (temp[j] <= piv) {
      i++;
      animations.push([j, temp[j]]);
      animations.push([i, temp[i]]);

      let t = temp[j];
      temp[j] = temp[i];
      temp[i] = t;

      animations.push([j, temp[j]]);
      animations.push([i, temp[i]]);
    }
  }

  animations.push([h, temp[h]]);
  animations.push([i + 1, temp[i + 1]]);

  let t = temp[h];
  temp[h] = temp[i + 1];
  temp[i + 1] = t;

  animations.push([h, temp[h]]);
  animations.push([i + 1, temp[i + 1]]);

  return i + 1;
}
