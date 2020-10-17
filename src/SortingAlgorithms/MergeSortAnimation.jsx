export function MergeSortAnimation(array) {
  const animations = [];
  const copyOfArray = array.slice();
  const temp = array.slice();
  mergeSort(copyOfArray, 0, array.length - 1, temp, animations);
  return animations;
}

function mergeSort(copyOfArray, start, end, temp, animations) {
  if (start < end) {
    const mid = Math.floor((start + end) / 2);
    mergeSort(temp, start, mid, copyOfArray, animations);
    mergeSort(temp, mid + 1, end, copyOfArray, animations);
    merge(copyOfArray, start, mid, end, temp, animations);
  }
}

function merge(copyOfArray, start, mid, end, temp, animations) {
  let k = start;
  let i = start;
  let j = mid + 1;
  while (i <= mid && j <= end) {
    animations.push([i, j]);
    animations.push([i, j]);

    if (temp[i] <= temp[j]) {
      animations.push([k, temp[i]]);
      copyOfArray[k++] = temp[i++];
    } else {
      animations.push([k, temp[j]]);
      copyOfArray[k++] = temp[j++];
    }
  }
  while (i <= mid) {
    animations.push([i, i]);
    animations.push([i, i]);

    animations.push([k, temp[i]]);
    copyOfArray[k++] = temp[i++];
  }
  while (j <= end) {
    animations.push([j, j]);
    animations.push([j, j]);

    animations.push([k, temp[j]]);
    copyOfArray[k++] = temp[j++];
  }
}
