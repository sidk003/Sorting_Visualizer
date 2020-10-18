import React, { Component } from "react";
import "./Body.css";
import Navbar from "../components/Navbar";
import { MergeSortAnimation } from "../SortingAlgorithms/MergeSortAnimation";
import { BubbleSortAnimation } from "../SortingAlgorithms/BubbleSortAnimation";
import { SelectionSortAnimation } from "../SortingAlgorithms/SelectionSortAnimation";
import { QuickSortAnimation } from "../SortingAlgorithms/QuickSortAnimation";

//Main Color of the Array-Bars
const PRIMARY_COLOR = "cornflowerblue";
//Speed of the Animation
const ANIMATION_SPEED_MS = 120;
//Color of the Array-Bars which are being compared during the sorting
const SECONDARY_COLOR = "red";
//Color of bars when array is Sorted
const FINAL_COLOR = "SlateBlue";
//Total time taken to finish Sorting(Global Variable)
var Total_time_taken;
//Flag to denote if any sorting button is clicked for the first time
var initialSort = true;

export default class Sorter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      finishedSorting: false,
    };
  }

  FinishedSorting() {
    //this function gets called when sorting of any type is completed to set-reset some flags and change final color

    let bars = document.getElementsByClassName("array-bar");
    //to change color of all bars to final color one by one
    setTimeout(() => {
      for (let i = 0; i < bars.length; i++)
        bars[i].style.backgroundColor = FINAL_COLOR;
      this.setState({ finishedSorting: true });
    }, Total_time_taken * ANIMATION_SPEED_MS);
  }

  bubbleSort = (array) => {
    if (this.state.finishedSorting || initialSort) {
      initialSort = false;
      this.setState({ finishedSorting: false });
      const animations = BubbleSortAnimation(array);

      const arrayBars = document.getElementsByClassName("array-bar");

      for (let i = 0; i < animations.length; i++) {
        const [
          barOneHeight,
          barOneIdx,
          barTwoHeight,
          barTwoIdx,
          barColor,
        ] = animations[i];

        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const barOneValue = arrayBars[barOneIdx];
        const barTwoValue = arrayBars[barTwoIdx];

        setTimeout(() => {
          barOneStyle.height = `${barOneHeight}px`;
          barTwoStyle.height = `${barTwoHeight}px`;
          barOneStyle.backgroundColor = barColor;
          barTwoStyle.backgroundColor = barColor;
          barOneValue.title = barOneHeight;
          barTwoValue.title = barTwoHeight;
        }, i * ANIMATION_SPEED_MS);

        Total_time_taken = i;
      }
      this.setState({ array });

      this.FinishedSorting();
    }
  };

  mergeSort = (array) => {
    //do Merge Sort on array

    if (this.state.finishedSorting || initialSort) {
      initialSort = false;
      this.setState({ finishedSorting: false });
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
            const barOneValue = arrayBars[barOneIdx];
            barOneStyle.height = `${newHeight}px`;
            barOneValue.title = newHeight;
          }, i * ANIMATION_SPEED_MS);
        }
        Total_time_taken = i;
      }

      this.setState({ array });

      this.FinishedSorting();
    }
  };

  selectionSort = (array) => {
    if (this.state.finishedSorting || initialSort) {
      initialSort = false;
      this.setState({ finishedSorting: false });

      const animations = SelectionSortAnimation(array);
      const arrayBars = document.getElementsByClassName("array-bar");

      var i = 0;
      for (i = 0; i < animations.length; i++) {
        const [
          barOneHeight,
          barOneIdx,
          barTwoHeight,
          barTwoIdx,
          barColor,
        ] = animations[i];

        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const barOneValue = arrayBars[barOneIdx];
        const barTwoValue = arrayBars[barTwoIdx];

        //no swapping required only red color to be highlighted to search the minimum element
        if (barTwoHeight === 0) {
          setTimeout(() => {
            barOneStyle.backgroundColor = barColor;
          }, i * ANIMATION_SPEED_MS);
        }
        //swap minimum element with left index
        else {
          setTimeout(() => {
            barOneStyle.height = `${barOneHeight}px`;
            barTwoStyle.height = `${barTwoHeight}px`;
            barOneStyle.backgroundColor = barColor;
            barTwoStyle.backgroundColor = barColor;
            barOneValue.title = barOneHeight;
            barTwoValue.title = barTwoHeight;
          }, i * ANIMATION_SPEED_MS);
        }
      }

      Total_time_taken = i;

      this.setState({ array });

      this.FinishedSorting();
    }
  };

  quickSort = (array) => {
    if (this.state.finishedSorting || initialSort) {
      initialSort = false;
      this.setState({ finishedSorting: false });
      const animations = QuickSortAnimation(array);

      const arrayBars = document.getElementsByClassName("array-bar");
      var i = 0;
      for (i = 0; i < animations.length; i++) {
        const [
          barOneHeight,
          barOneIdx,
          barTwoHeight,
          barTwoIdx,
          barColor,
        ] = animations[i];

        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const barOneValue = arrayBars[barOneIdx];
        const barTwoValue = arrayBars[barTwoIdx];

        if (barTwoHeight === 0) {
          setTimeout(() => {
            barOneStyle.backgroundColor = barColor;
          }, i * ANIMATION_SPEED_MS);
        } else {
          setTimeout(() => {
            barOneStyle.height = `${barOneHeight}px`;
            barTwoStyle.height = `${barTwoHeight}px`;
            barOneStyle.backgroundColor = barColor;
            barTwoStyle.backgroundColor = barColor;
            barOneValue.title = barOneHeight;
            barTwoValue.title = barTwoHeight;
          }, i * ANIMATION_SPEED_MS);
        }
      }

      Total_time_taken = i;
    }
    this.setState({ array });

    this.FinishedSorting();
  };

  render() {
    return (
      <div>
        <Navbar
          mergeSort={this.mergeSort}
          bubbleSort={this.bubbleSort}
          selectionSort={this.selectionSort}
          quickSort={this.quickSort}
          finishedSorting={this.state.finishedSorting}
          initialSort={initialSort}
        />
      </div>
    );
  }
}

// function checkIfArraysAreEqual(arrayOne, arrayTwo) {
//   if (arrayOne.length !== arrayTwo.length) return false;

//   for (let i = 0; i < arrayOne.length; i++) {
//     if (arrayOne[i] !== arrayTwo[i]) return false;
//   }
//   return true;
// }
