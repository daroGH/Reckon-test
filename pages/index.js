import { useState, useEffect } from "react";
import { render } from "react-dom";
import { Login } from "../components/Login/Login";
import styles from "../styles/Home.module.css";

const endPoint1 = "https://join.reckon.com/test1/rangeInfo";
const endPoint2 = "https://join.reckon.com/test1/divisorInfo";

export default function Home() {
  //create variable to store data from url
  const [range, setRange] = useState(0);
  const [outputDetail, setOutputDetail] = useState([]);
  const [fetchError, setFetchError] = useState(false);

  //function for setting if the api success fail or success
  const apiSuccess = () => {
    setFetchError(false);
  };
  const apiFail = () => {
    setFetchError(true);
  };

  //fetching data
  //TODO: (1) fix the fetching function because sometime its not response properly 
  const fetchEndPoint = async () => {
    //use try to prevent from fetch fail api
    try {
      const response1 = await fetch(endPoint1);
      const response2 = await fetch(endPoint2);

      //for the case its not success
      if (!response1.ok && !response2.ok) {
        apiFail();
        throw Error("Did not received data");
      }

      const handleRes1 = await response1.json();
      const handleRes2 = await response2.json();
      //when success set it to the useState variable
      setRange(handleRes1);
      setOutputDetail(handleRes2);
      apiSuccess();

      console.log("range", range);
      console.log("outputdetail", outputDetail);
    } catch (err) {
      console.log(err.message);
    }
  };
  

  useEffect(() => {
    // if (fetchError) {
    //   fetchEndPoint();
    // }
    fetchEndPoint();
  }, []);


  const rendingNumber = () => {
    //console.log("divisor1", outputDetail.outputDetails[0].divisor);
    // use these variable just want to see if I call the right object
    const outDiv3 = outputDetail.outputDetails[0].divisor;
    const outDiv5 = outputDetail.outputDetails[1].divisor;

    const output3 = outputDetail.outputDetails[0].output;
    const output5 = outputDetail.outputDetails[1].output;

    //the for loop work well for i when tried to console log
    // the problem is that it didnt looping all variable when try to put those statement
    for (let i = range.lower + 1; i < range.upper + 1; i++) {
      const listOfRange = i;
      const divBy3 = listOfRange % outDiv3 === 0;
      const divBy5 = listOfRange % outDiv5 === 0;

      //TODO: 2) the for loop somehow only loop 1 round of the variable then it stop
      if (divBy3 && divBy5) {
        return (
          <h1>
            {i} : {output3}
            {output5}
          </h1>
        );
      }
      if (divBy3) {

        return (
          <h1>
            {i} : {output3}
          </h1>
        );
      }
      if (divBy5) {

        return (
          <h1>
            {i} : {output5}
          </h1>
        );
      } else {
        return <h1>{i}:</h1>;
      }
    }
  };

  return <div>{rendingNumber()}</div>;
}
