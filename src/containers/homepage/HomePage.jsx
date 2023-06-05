import React, { useEffect, useState } from "react";
import { VscArrowSwap } from "react-icons/vsc";
import { SlPencil } from "react-icons/sl";
import "./homepage.css";
import Input from "../../components/fields/Input";
import Select from "../../components/fields/Select";
import { getLatest } from "../../services/api";
import {ToastContainer} from "react-toastify"

const HomePage = () => {
  const [startValue, setStartValue] = useState("");

  const [fromValue, setFromValue] = useState(1);
  const [toValue, setToValue] = useState("");

  const [focusedFrom, setFocusedFrom] = useState(false);
  const [focusedTo, setFocusedTo] = useState(false);

  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PKR");

  const [exchange, setExchange] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getLatest();
        const data = Object.keys(res.data.rates);
        setExchange(data);
        setStartValue(res.data.rates.PKR);
        setToValue(res.data.rates.PKR);
        console.log("res");
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAndUpdateData = () => {
      fetchData();
      setTimeout(fetchAndUpdateData, 86400000); // Recall the function after 24 hours
    };

    fetchAndUpdateData();
  }, []);

  return (
    <>
      <div className="homepage">
        <div>
          <span className="currency-title">Currency Converter</span>
        </div>

        <div className="currency-converted-title-container">
          <span className="currency-converted-title">
            1 {fromCurrency} = {startValue}&nbsp;{toCurrency}
          </span>
        </div>

        <div className="currency-converter-container">
          <div
            style={{
              width: "47%",
            }}
          >
            <div className="currency-converter-title">
              <span>From</span>
            </div>

            <div className="currency-input-container">
              <Select
                options={exchange}
                currency={fromCurrency}
                setCurrency={setFromCurrency}
                previousCurrency={toCurrency}
                setStartValue={setStartValue}
                setFromValue={setFromValue}
                setToValue={setToValue}
              />
              <div className="currency-input">
                {focusedFrom ? (
                  <>
                    <Input
                      value={fromValue}
                      setFocused={setFocusedFrom}
                      setValue={setFromValue}
                      setPrevValue={setToValue}
                      startValue={startValue}
                    />
                  </>
                ) : (
                  <>
                    <div
                      className="currency-value-container"
                      onClick={() => setFocusedFrom(true)}
                    >
                      <span className="currency-value">
                        {focusedTo ? toValue / startValue : fromValue}
                      </span>
                      <span>
                        {
                          <SlPencil
                            fontSize={20}
                            style={{ marginTop: "6px" }}
                          />
                        }
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "15px",
            }}
          >
            <VscArrowSwap color="#006CBE" fontSize={25} fontWeight={500} />
          </div>

          <div
            style={{
              width: "47%",
            }}
          >
            <div className="currency-converter-title">
              <span>To</span>
            </div>

            <div className="currency-input-container">
              <Select
                options={exchange}
                currency={toCurrency}
                setCurrency={setToCurrency}
                previousCurrency={fromCurrency}
                setStartValue={setStartValue}
                setFromValue={setFromValue}
                setToValue={setToValue}
              />
              <div className="currency-input">
                {focusedTo ? (
                  <>
                    <Input
                      value={toValue}
                      setFocused={setFocusedTo}
                      setValue={setToValue}
                      setPrevValue={setFromValue}
                      startValue={startValue}
                      from="yes"
                    />
                  </>
                ) : (
                  <>
                    <div
                      className="currency-value-container"
                      onClick={() => setFocusedTo(true)}
                    >
                      <div className="currency-value">
                        {focusedFrom ? fromValue * startValue : toValue}
                      </div>
                      <span>
                        {
                          <SlPencil
                            fontSize={20}
                            style={{ marginTop: "6px" }}
                          />
                        }
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>     
      </div>
      
    </>
  );
};

export default HomePage;
