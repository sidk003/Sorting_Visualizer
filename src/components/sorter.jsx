import React, { Component } from "react";
import "./Body.css";
import Navbar from "../components/Navbar";
import { MergeSortAnimation } from "../SortingAlgorithms/MergeSortAnimation";
import { BubbleSortAnimation } from "../SortingAlgorithms/BubbleSortAnimation";
import { InsertionSortAnimation } from "../SortingAlgorithms/InsertionSortAnimation";
import { QuickSortAnimation } from "../SortingAlgorithms/QuickSortAnimation";

//Main Color of the Array-Bars
const PRIMARY_COLOR = "cornflowerblue";
//Speed of the Animation
const ANIMATION_SPEED_MS = 10;
//Color of the Array-Bars which are being compared during the sorting
const SECONDARY_COLOR = "red";
//Color of bars when array is Sorted
const FINAL_COLOR = "SlateBlue";
//Total time taken to finish Sorting(Global Variable)
let Total_time_taken;

export default class Sorter extends Component {
  FinishedSorting() {
    let bars = document.getElementsByClassName("array-bar");
    setTimeout(() => {
      for (let i = 0; i < bars.length; i++)
        bars[i].style.backgroundColor = FINAL_COLOR;
    }, Total_time_taken * ANIMATION_SPEED_MS);
  }

  bubbleSort = (array) => {
    //console.log(array);
    //const jsSortedArray = array.slice().sort((a, b) => a - b);
    //const NewArray = BubbleSortAnimation(array);
    //console.log(checkIfArraysAreEqual(jsSortedArray, NewArray));
    const animations = BubbleSortAnimation(array);

    const arrayBars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length - 1; i++) {
      const [barOneIdx, newHeight1] = animations[i];
      const [barTwoIdx, newHeight2] = animations[i + 1];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;

      //console.log(i, i + 1);
      setTimeout(() => {
        //const Color = i % 2 ? SECONDARY_COLOR : PRIMARY_COLOR;
        barOneStyle.backgroundColor = PRIMARY_COLOR;
        barTwoStyle.backgroundColor = SECONDARY_COLOR;
      }, i * ANIMATION_SPEED_MS);

      setTimeout(() => {
        barOneStyle.height = `${newHeight1}px`;
        barTwoStyle.height = `${newHeight2}px`;
      }, i * ANIMATION_SPEED_MS);

      Total_time_taken = i;
    }
    this.setState({ array });

    this.FinishedSorting();
  };

  mergeSort = (array) => {
    //do Merge Sort on array

    const animations = MergeSortAnimation(array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
      Total_time_taken = i;
    }

    this.setState({ array });

    this.FinishedSorting();
  };

  insertionSort = (array) => {
    /*console.log(this.state.array);
    const jsSortedArray = this.state.array.slice().sort((a, b) => a - b);
    const NewArray = InsertionSortAnimation(this.state.array);
    console.log(checkIfArraysAreEqual(jsSortedArray, NewArray));*/
    const animations = InsertionSortAnimation(array);

    const arrayBars = document.getElementsByClassName("array-bar");
    let k;
    let j;
    for (j = 1; j <= array.length; j++) {
      const [KeyIdx, newHeight1] = animations[j];
      const KeyBarStyle = arrayBars[KeyIdx].style;

      for (k = 0; k < j; k++) {
        const [newBarIdx, newHeight2] = animations[k];
        const newBarStyle = arrayBars[newBarIdx].style;

        setTimeout(() => {
          newBarStyle.height = `${newHeight2}px`;
        }, (j + k) * ANIMATION_SPEED_MS);
      }
      setTimeout(() => {
        KeyBarStyle.height = `${newHeight1}px`;
      }, (j + k) * ANIMATION_SPEED_MS);
    }
  };

  quickSort = (array) => {
    /*console.log(this.state.array);
    const jsSortedArray = this.state.array.slice().sort((a, b) => a - b);
    const NewArray = QuickSortAnimation(this.state.array);
    console.log(checkIfArraysAreEqual(jsSortedArray, NewArray));*/
  };

  render() {
    return (
      <div>
        <Navbar
          mergeSort={this.mergeSort}
          bubbleSort={this.bubbleSort}
          insertionSort={this.insertionSort}
          quickSort={this.quickSort}
        />
      </div>
    );
  }
}

function checkIfArraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;

  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) return false;
  }
  return true;
}
