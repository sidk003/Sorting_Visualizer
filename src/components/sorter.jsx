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
//Total time taken to finish Sorting(Global Variable)
var Total_time_taken;
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
    // console.log(array);
    // const jsSortedArray = array.slice().sort((a, b) => a - b);
    // const NewArray = BubbleSortAnimation(array);
    // console.log(checkIfArraysAreEqual(jsSortedArray, NewArray));

    if (this.state.finishedSorting || initialSort) {
      initialSort = false;
      this.setState({ finishedSorting: false });
      const animations = BubbleSortAnimation(array);

      const arrayBars = document.getElementsByClassName("array-bar");
      // var count = 0;
      for (let i = 0; i < animations.length - 1; i++) {
        const [barOneIdx, newHeight1] = animations[i];
        const [barTwoIdx, newHeight2] = animations[i + 1];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        //console.log(i, i + 1);
        setTimeout(() => {
          const Color = i % 2 ? SECONDARY_COLOR : PRIMARY_COLOR;
          barOneStyle.backgroundColor = Color;
          barTwoStyle.backgroundColor = Color;
        }, i * ANIMATION_SPEED_MS);

        setTimeout(() => {
          barOneStyle.height = `${newHeight1}px`;
          barTwoStyle.height = `${newHeight2}px`;
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

      for (let i = 0; i < animations.length - 1; i++) {
        const [barOneIdx, newHeight1] = animations[i];
        const [barTwoIdx, newHeight2] = animations[i + 1];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        // //console.log(i, i + 1);
        // setTimeout(() => {
        //   const Color = i % 2 ? SECONDARY_COLOR : PRIMARY_COLOR;
        //   barOneStyle.backgroundColor = Color;
        //   barTwoStyle.backgroundColor = Color;
        // }, i * ANIMATION_SPEED_MS);

        setTimeout(() => {
          barOneStyle.height = `${newHeight1}px`;
          barTwoStyle.height = `${newHeight2}px`;
        }, i * ANIMATION_SPEED_MS);

        Total_time_taken = i;
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

      for (let i = 0; i < animations.length - 1; i++) {
        const [barOneIdx, newHeight1] = animations[i];
        const [barTwoIdx, newHeight2] = animations[i + 1];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        // //console.log(i, i + 1);
        // setTimeout(() => {
        //   const Color = i % 2 ? SECONDARY_COLOR : PRIMARY_COLOR;
        //   barOneStyle.backgroundColor = Color;
        //   barTwoStyle.backgroundColor = Color;
        // }, i * ANIMATION_SPEED_MS);

        setTimeout(() => {
          barOneStyle.height = `${newHeight1}px`;
          barTwoStyle.height = `${newHeight2}px`;
        }, i * ANIMATION_SPEED_MS);

        Total_time_taken = i;
      }
      this.setState({ array });

      this.FinishedSorting();
    }

    // if (this.state.finishedSorting || initialSort) {
    //   initialSort = false;
    //   this.setState({ finishedSorting: false });
    //   const animations = QuickSortAnimation(array);

    //   const arrayBars = document.getElementsByClassName("array-bar");

    //   for (let i = 0; i < animations.length - 1; i++) {
    //     const [barOneIdx, newHeight1] = animations[i];
    //     const [barTwoIdx, newHeight2] = animations[i + 1];
    //     const barOneStyle = arrayBars[barOneIdx].style;
    //     const barTwoStyle = arrayBars[barTwoIdx].style;

    //     // setTimeout(() => {
    //     //   barOneStyle.backgroundColor = SECONDARY_COLOR;
    //     //   barTwoStyle.backgroundColor = SECONDARY_COLOR;
    //     // }, i * ANIMATION_SPEED_MS);

    //     setTimeout(() => {
    //       barOneStyle.height = `${newHeight1}px`;
    //       barTwoStyle.height = `${newHeight2}px`;
    //     }, i * ANIMATION_SPEED_MS);

    //     Total_time_taken = i;
    //   }

    //   this.setState({ array });
    //   this.FinishedSorting();
    //   // console.log(array);
    //   // const jsSortedArray = array.slice().sort((a, b) => a - b);
    //   // const NewArray = QuickSortAnimation(array);
    //   // console.log(NewArray);
    //   // console.log(checkIfArraysAreEqual(jsSortedArray, NewArray));
    // }
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

function checkIfArraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;

  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) return false;
  }
  return true;
}
