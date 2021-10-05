import { useState, useEffect } from "react";

export default function Home() {
  //create variable to store data from url

  const [rangeInfo, setRangeInfo] = useState();
  const [outputDetail, setOutputDetail] = useState([]);
  //How to use this fomat
  const [finalOuput, setFinalOutput] = useState({ id: [], value: "" });
  const [fetchError, setFetchError] = useState(false);

  // fetch rangeInfo
  useEffect(() => {
    const fetchingRangeInfo = async () => {
      try {
        const rangeInfoResponse = await fetch(
          "https://join.reckon.com/test1/rangeInfo"
        ); // fetch no cors issue
        const handleRangeInfo = await rangeInfoResponse.json();
        if (handleRangeInfo) setRangeInfo(handleRangeInfo);
      } catch (e) {
        console.log("e", e);
      }
    };
    fetchingRangeInfo();
  }, []);

  // fetch divisorInfo
  useEffect(() => {
    const fetchingDivisorInfo = async () => {
      try {
        const divisorInfoResponse = await fetch(
          "https://join.reckon.com/test1/divisorInfo"
        ); // fetch no cors issue
        const handleDivisorInfo = await divisorInfoResponse.json();
        if (handleDivisorInfo) setOutputDetail(handleDivisorInfo);
      } catch (e) {
        console.log("e", e);
      }
    };
    fetchingDivisorInfo();
  }, []);

  console.log("rangeInfo", rangeInfo);
  console.log("outputDetail", outputDetail);

  //output component of output detail
  //TODO: try to access it dynamically
  const divisorOf3 =
    outputDetail &&
    outputDetail.outputDetails &&
    outputDetail.outputDetails[0] &&
    outputDetail.outputDetails[0].divisor;
  const divisorOf5 =
    outputDetail &&
    outputDetail.outputDetails &&
    outputDetail.outputDetails[1] &&
    outputDetail.outputDetails[1].divisor;

  const outputOf3 =
    outputDetail &&
    outputDetail.outputDetails &&
    outputDetail.outputDetails[0] &&
    outputDetail.outputDetails[0].output;
  const outputOf5 =
    outputDetail &&
    outputDetail.outputDetails &&
    outputDetail.outputDetails[1] &&
    outputDetail.outputDetails[1].output;

  //Check if the fetch success or not
  if (!outputDetail || !rangeInfo || !outputOf3 || !outputOf5) {
    return <div>Unable to fetch</div>;
  }

  const rangeOfNumber = [];

  const rendingNumber = () => {
    //the for loop work well for i when tried to console log
    // the problem is that it didnt looping all variable when try to put those statement

    for (let i = rangeInfo.lower + 1; i < rangeInfo.upper + 1; i++) {
      rangeOfNumber.push(i);
    }
  };
  console.log("rangeOfNumber", rangeOfNumber);

  // map function
  // const blah = [{i: 0, name: 'boss'}, {i: 1, name: ''}, {i: 2, name: 'bosshogg'}]
  /* blah.map(output => return(<h1>
            {i} : {outDiv3}
            {output5}
          </h1>))  
*/

  return (
    <div>
      <h2>This is test1</h2>
      {outputDetail.map((value, index) => {
        const { outputDetails } = value;
        return <article key="index"></article>;
      })}
      {/* if (outcome % divisorOf3 === 0) {
          return <h1>{outputOf3}</h1>
        }
        if (index % divisorOf5 === 0) {
          name = outputOf5;
        } else {
          name = "";
        }
        return (
          <h1 key={outcome}>
            {outcome}:{name}
          </h1>
        ); */}

      {rendingNumber()}

      {/* blah.map(output => return(<h1>
            {i} : {outDiv3}
            {output5}
          </h1>)) */}
    </div>
  );
}
