import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "./fields.css";
import { updateCurrency } from "../../services/api";
import {toast, ToastContainer} from "react-toastify"

const Select = ({
  options,
  currency,
  setCurrency,
  previousCurrency,
  setStartValue,
  setFromValue,
  setToValue,
}) => {
  const selectRef = useRef(null);
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  const updatedCurrencyData = async (x, y) => {
    try {
      const res = await updateCurrency(x, y);
      const data = res.data.rates;
      const obj = Object.keys(res.data.rates);
      const start = obj[0];
      setStartValue(data[start]);
      setToValue(data[start]);
      setFromValue(1);
    } catch (error) {
        toast.error(`${error?.response?.data.message}`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
      console.log(error.response);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target))
        setFocused(false);
    };
    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  });

  const filteredData = options?.filter((item) =>
    item.includes(value?.toUpperCase())
  );

  return (
    <>
      <div
        className="currency-input-dropdown"
        ref={selectRef}
        onClick={() => setFocused(true)}
      >
        {focused ? (
          <>
            <input
              className="dropdown-input"
              autoFocus={true}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <IoIosArrowUp fontSize={22} />
          </>
        ) : (
          <>
            {" "}
            <span className="currency-converter-title">{currency}</span>
            <span>
              {" "}
              <IoIosArrowDown fontSize={22} />
            </span>{" "}
          </>
        )}
      </div>
      {focused && (
        <div className="dropdown-list">
          {filteredData?.map((data, index) => {
            return (
              <>
                <div
                  key={index}
                  onClick={() => {
                    if (data === previousCurrency) return;
                    else {
                      setCurrency(data);
                      updatedCurrencyData(previousCurrency, data);
                    }
                  }}
                  className="dropdown-list-item"
                >
                  {data}
                </div>
              </>
            );
          })}
          
        <ToastContainer/>
        </div>
      )}
    </>
  );
};

export default Select;
