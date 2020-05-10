export function QuickSortAnimation(array) {
  const temp = array.slice();
  //const animations = [];
  quickSort(temp, 0, array.length - 1);
  return temp;
}

function quickSort(temp, l, h) {
  if (l < h) {
    let piv = partition(temp, l, h);
    quickSort(temp, l, piv - 1);
    quickSort(temp, piv + 1, h);
  }
}

function partition(temp, l, h) {
  let piv = temp[h],
    i = l - 1,
    j;
  for (j = l; j < h; j++) {
    if (temp[j] <= piv) {
      i++;
      let t = temp[j];
      temp[j] = temp[i];
      temp[i] = t;
    }
  }
  let t = temp[h];
  temp[h] = temp[i + 1];
  temp[i + 1] = t;
  return i + 1;
}
