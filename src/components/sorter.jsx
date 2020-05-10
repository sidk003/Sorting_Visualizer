import React from "react";
import "./Body.css";
import { BubbleSortAnimation } from "../SortingAlgorithms/BubbleSortAnimation";
import { InsertionSortAnimation } from "../SortingAlgorithms/InsertionSortAnimation";
import { MergeSortAnimation } from "../SortingAlgorithms/MergeSortAnimation";
import { QuickSortAnimation } from "../SortingAlgorithms/QuickSortAnimation";

//No. of Array-Bars(This value chosen so that all bars fit in a single page)
const NUMBER_OF_ARRAY_BARS = 79;
//const NUMBER_OF_ARRAY_BARS = 5;
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

export default class Sorter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  FinishedSorting() {
    let bars = document.getElementsByClassName("array-bar");
    setTimeout(() => {
      for (let i = 0; i < bars.length; i++)
        bars[i].style.backgroundColor = FINAL_COLOR;
    }, Total_time_taken * ANIMATION_SPEED_MS);
  }

  componentDidMount() {
    this.PushRandomNumber();
  }

  //Function to push random nos. in the array
  PushRandomNumber = () => {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      //Range of nos. is chosen so that array bar height fit in the page
      //Least value is taken as 5 so that smallest bar is significantly visible
      array.push(randomNoFromInterval(5, 535));
    }
    this.setState({ array });
  };

  bubbleSort() {
    //console.log(this.state.array);
    //const jsSortedArray = this.state.array.slice().sort((a, b) => a - b);
    //const NewArray = BubbleSortAnimation(this.state.array);
    //console.log(checkIfArraysAreEqual(jsSortedArray, NewArray));
    const animations = BubbleSortAnimation(this.state.array);

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
    //console.log(NewArray);
    this.FinishedSorting();
  }

  insertionSort() {
    /*console.log(this.state.array);
    const jsSortedArray = this.state.array.slice().sort((a, b) => a - b);
    const NewArray = InsertionSortAnimation(this.state.array);
    console.log(checkIfArraysAreEqual(jsSortedArray, NewArray));*/
    const animations = InsertionSortAnimation(this.state.array);
  }

  mergeSort() {
    const animations = MergeSortAnimation(this.state.array);
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
    this.FinishedSorting();
  }

  quickSort() {
    /*console.log(this.state.array);
    const jsSortedArray = this.state.array.slice().sort((a, b) => a - b);
    const NewArray = QuickSortAnimation(this.state.array);
    console.log(checkIfArraysAreEqual(jsSortedArray, NewArray));*/
  }

  render() {
    const { array } = this.state;
    return (
      <div className="parent">
        <nav className="navbar navbar-dark bg-dark">
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                className="btn btn-outline-light navbar-btn"
                onClick={() => this.PushRandomNumber()}
              >
                Generate New Array
              </button>
            </div>

            <div className="btn-group" role="group" aria-label="Basic example">
              <button
                className="btn btn-outline-light navbar-btn m-2"
                onClick={() => this.bubbleSort()}
              >
                Bubble Sort
              </button>

              <button
                className="btn btn-outline-light navbar-btn m-2"
                disabled
                onClick={() => this.insertionSort()}
              >
                Insertion Sort
              </button>

              <button
                className="btn btn-outline-light navbar-btn m-2"
                onClick={() => this.mergeSort()}
              >
                Merge Sort
              </button>

              <button
                className="btn btn-outline-light navbar-btn m-2"
                disabled
                onClick={() => this.quickSort()}
              >
                Quick Sort
              </button>
            </div>
          </div>
        </nav>

        <div className="array-container">
          {array.map((value, index) => (
            <div
              className="array-bar"
              key={index}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

//Function to generate random nos. in a specified range(Requirement of javascript to specify range)
function randomNoFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkIfArraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;

  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) return false;
  }
  return true;
}
