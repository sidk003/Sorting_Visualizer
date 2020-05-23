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
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (temp[i] <= temp[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, temp[i]]);
      copyOfArray[k++] = temp[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, temp[j]]);
      copyOfArray[k++] = temp[j++];
    }
  }
  while (i <= mid) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, temp[i]]);
    copyOfArray[k++] = temp[i++];
  }
  while (j <= end) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, temp[j]]);
    copyOfArray[k++] = temp[j++];
  }
}
