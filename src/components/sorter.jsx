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
const ANIMATION_SPEED_MS = 10;
//Color of the Array-Bars which are being compared during the sorting
const SECONDARY_COLOR = "red";
//Color of bars when array is Sorted
const FINAL_COLOR = "SlateBlue";
//Color of the bars when looping through them
const PASS_COLOR = "green";
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
    let bars = document.getElementsByClassName("array-bar");
    setTimeout(() => {
      for (let i = 0; i < bars.length; i++)
        bars[i].style.backgroundColor = FINAL_COLOR;
    }, Total_time_taken * ANIMATION_SPEED_MS);
    setTimeout(() => {
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

        setTimeout(() => {
          barOneStyle.height = `${barOneHeight}px`;
          barTwoStyle.height = `${barTwoHeight}px`;
          barOneStyle.backgroundColor = barColor;
          barTwoStyle.backgroundColor = barColor;
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
            barOneStyle.height = `${newHeight}px`;
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

      // console.log(animations);
      var count = 0,
        i = 0;
      for (i = 0; i < animations.length; i++) {
        //index and height of incoming minimum element in single pass
        const [barIndex, barHeight] = animations[i];

        //minimum element
        const barOneStyle = arrayBars[barIndex].style;
        //current element
        const barTwoStyle = arrayBars[count].style;

        //To blink bars from left to right
        if (barHeight === 0) {
          setTimeout(() => {
            barOneStyle.backgroundColor = PASS_COLOR;
          }, i * ANIMATION_SPEED_MS);

          setTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
          }, i * ANIMATION_SPEED_MS + ANIMATION_SPEED_MS - 1);
        }
        //swap minimum and current element
        else {
          //next 2 timeouts to blink minimum element
          setTimeout(() => {
            barOneStyle.backgroundColor = SECONDARY_COLOR;
          }, i * ANIMATION_SPEED_MS);

          setTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
          }, i * ANIMATION_SPEED_MS + ANIMATION_SPEED_MS - 1);

          //next 2 timeouts to blink current element
          setTimeout(() => {
            barTwoStyle.backgroundColor = SECONDARY_COLOR;
          }, i * ANIMATION_SPEED_MS);

          setTimeout(() => {
            barTwoStyle.backgroundColor = PASS_COLOR;
          }, i * ANIMATION_SPEED_MS + ANIMATION_SPEED_MS - 1);

          //next 2 timouts to actually show swapping by swapping heights
          setTimeout(() => {
            barOneStyle.height = barTwoStyle.height;
          }, i * ANIMATION_SPEED_MS);

          setTimeout(() => {
            barTwoStyle.height = `${barHeight}px`;
          }, i * ANIMATION_SPEED_MS);

          //Current element counter increment
          count++;
        }

        Total_time_taken = i + 1;
      }

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

        if (barTwoHeight === 0) {
          setTimeout(() => {
            barOneStyle.backgroundColor = barColor;
          }, i * ANIMATION_SPEED_MS);
        } else {
          console.log(
            "barOne : ",
            barOneHeight,
            "barTwo : ",
            barTwoHeight,
            barColor
          );

          setTimeout(() => {
            barOneStyle.height = `${barOneHeight}px`;
            barTwoStyle.height = `${barTwoHeight}px`;
            barOneStyle.backgroundColor = barColor;
            barTwoStyle.backgroundColor = barColor;
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
