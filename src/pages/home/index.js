import React from "react";
import { useEffect, useState } from "react";
import "./styles.css";
import Cookies from "js-cookie";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Home({ user }) {
  useEffect(() => {}, []);
  useEffect(() => {
    getDashboardDetails();
  }, []);

  const data = [
    { name: "Custom", uv: 444 },
    { name: "Category1", uv: 190 },
    { name: "Category2", uv: 145 },
    { name: "Category3", uv: 90 },
    { name: "Category4", uv: 49 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#ffff",
            padding: "5px",
            border: "1px solid #cccc",
          }}
        >
          <label>{`${label} : ${payload[0].value}`}</label>
        </div>
      );
    }

    return null;
  };
  const [res, setRes] = useState();
  const [save, setSave] = useState(true);
  const [details, setDetails] = useState();
  const [chargeCust, setchargeCust] = useState();
  const getDashboardDetails = async () => {
    try {
      //   console.log(user.data.id);
      const { data } = await axios.get(
        `https://stg.dhunjam.in/account/admin/${user.data.id}`
      );
      setRes(data.data);
      //   setRes({ ...res, charge_customers: false });

      setDetails(data?.data?.amount);
      setchargeCust(data?.data?.charge_customers);
    } catch (err) {}
  };

  const putDashboardDetails = async () => {
    try {
      const { data } = await axios.put(
        `https://stg.dhunjam.in/account/admin/${user.data.id}`,
        {
          amount: details,
        }
      );
      console.log(data);
      setDetails(data?.data?.amount);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: Number(value) });
    console.log(details);
    if (name === "category_6") {
      if (value < 99) {
        setSave(false);
      } else {
        setSave(true);
      }
    }
    if (name === "category_7") {
      if (value < 79) {
        setSave(false);
      } else {
        setSave(true);
      }
    }
    if (name === "category_8") {
      if (value < 59) {
        setSave(false);
      } else {
        setSave(true);
      }
    }
    if (name === "category_9") {
      if (value < 39) {
        setSave(false);
      } else {
        setSave(true);
      }
    }
    if (name === "category_10") {
      if (value < 19) {
        setSave(false);
      } else {
        setSave(true);
      }
    }
    console.log(save);
  };
  console.log(details);
  console.log(chargeCust);
  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        color: "#FFFFFF",
        backgroundColor: "#030303",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div>
        <h1 style={{ fontSize: "32px" }}>
          {res?.name}, {res?.location} on Dhun Jam
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <span style={{ paddingRight: "50px" }}>
            Do you want to charge your<br></br> customers for requesting songs?
          </span>
          <center>
            <div>
              <input
                type="radio"
                name="charge"
                value="yes"
                defaultChecked={res?.charge_customers}
                className="radio-input"
                onClick={() => setchargeCust(true)}
              />
              Yes &nbsp;
              <input
                type="radio"
                name="charge"
                value="no"
                defaultChecked={!res?.charge_customers}
                className="radio-input"
                onClick={() => setchargeCust(false)}
              />
              No
            </div>
          </center>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "50px",
          }}
        >
          <span style={{ paddingRight: "50px" }}>
            Custom song request amount-
          </span>
          <div>
            {res?.charge_customers && chargeCust ? (
              <input
                type="number"
                defaultValue={details?.category_6}
                name="category_6"
                onChange={handleChange}
                style={{
                  width: "300px",
                  margin: "0 10px",
                  padding: "10px",
                  backgroundColor: "transparent",
                  border: "1px solid #FFFFFF",
                  borderRadius: "15px",
                  color: "#FFFFFF",
                  fontSize: "16px",
                  textAlign: "center",
                }}
              />
            ) : (
              <input
                type="number"
                defaultValue={details?.category_6}
                name="category_6"
                onChange={handleChange}
                style={{
                  width: "300px",
                  margin: "0 10px",
                  padding: "10px",
                  backgroundColor: "#C2C2C2",
                  border: "1px solid #FFFFFF",
                  borderRadius: "15px",
                  color: "#FFFFFF",
                  fontSize: "16px",
                  textAlign: "center",
                }}
                disabled
              />
            )}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ paddingRight: "60px" }}>
            Regular song request amounts,
            <br />
            from high to low:
          </span>
          <div>
            {res?.charge_customers && chargeCust ? (
              <input
                type="number"
                name="category_7"
                onChange={handleChange}
                defaultValue={details?.category_7}
                style={{
                  width: "100px",
                  padding: "10px",
                  backgroundColor: "transparent",
                  border: "1px solid #FFFFFF",
                  borderRadius: "15px",
                  color: "#FFFFFF",
                  fontSize: "16px",
                  marginRight: "10px",
                  textAlign: "center",
                }}
              />
            ) : (
              <input
                type="number"
                name="category_7"
                onChange={handleChange}
                defaultValue={details?.category_7}
                style={{
                  width: "100px",
                  padding: "10px",
                  backgroundColor: "#C2C2C2",
                  border: "1px solid #FFFFFF",
                  borderRadius: "15px",
                  color: "#FFFFFF",
                  fontSize: "16px",
                  marginRight: "10px",
                  textAlign: "center",
                }}
                disabled={true}
              />
            )}

            {res?.charge_customers && chargeCust ? (
              <input
                type="number"
                name="category_8"
                onChange={handleChange}
                defaultValue={details?.category_8}
                style={{
                  width: "100px",
                  padding: "10px",
                  backgroundColor: "transparent",
                  border: "1px solid #FFFFFF",
                  borderRadius: "15px",
                  color: "#FFFFFF",
                  fontSize: "16px",
                  marginRight: "10px",
                  textAlign: "center",
                }}
              />
            ) : (
              <input
                type="number"
                name="category_8"
                onChange={handleChange}
                defaultValue={details?.category_8}
                style={{
                  width: "100px",
                  padding: "10px",
                  backgroundColor: "#C2C2C2",
                  border: "1px solid #FFFFFF",
                  borderRadius: "15px",
                  color: "#FFFFFF",
                  fontSize: "16px",
                  marginRight: "10px",
                  textAlign: "center",
                }}
                disabled={true}
              />
            )}
            {res?.charge_customers && chargeCust ? (
              <input
                type="number"
                name="category_9"
                onChange={handleChange}
                defaultValue={details?.category_9}
                style={{
                  width: "100px",
                  padding: "10px",
                  backgroundColor: "transparent",
                  border: "1px solid #FFFFFF",
                  borderRadius: "15px",
                  color: "#FFFFFF",
                  fontSize: "16px",
                  marginRight: "10px",
                  textAlign: "center",
                }}
              />
            ) : (
              <input
                type="number"
                name="category_9"
                onChange={handleChange}
                defaultValue={details?.category_9}
                style={{
                  width: "100px",
                  padding: "10px",
                  backgroundColor: "#C2C2C2",
                  border: "1px solid #FFFFFF",
                  borderRadius: "15px",
                  color: "#FFFFFF",
                  fontSize: "16px",
                  marginRight: "10px",
                  textAlign: "center",
                }}
                disabled
              />
            )}

            {res?.charge_customers && chargeCust ? (
              <input
                type="number"
                name="category_10"
                onChange={handleChange}
                defaultValue={details?.category_10}
                style={{
                  width: "100px",
                  padding: "10px",
                  backgroundColor: "transparent",
                  border: "1px solid #FFFFFF",
                  borderRadius: "15px",
                  color: "#FFFFFF",
                  fontSize: "16px",
                  marginRight: "10px",
                  textAlign: "center",
                }}
              />
            ) : (
              <input
                type="number"
                name="category_10"
                onChange={handleChange}
                defaultValue={details?.category_10}
                style={{
                  width: "100px",
                  padding: "10px",
                  backgroundColor: "#C2C2C2",
                  border: "1px solid #FFFFFF",
                  borderRadius: "15px",
                  color: "#FFFFFF",
                  fontSize: "16px",
                  marginRight: "10px",
                  textAlign: "center",
                }}
                disabled={true}
              />
            )}
          </div>
        </div>
        <br></br>
        &nbsp;
        <div>
          <div style={{ alignItems: "end" }}>
            <i class="fa fa-inr fa-4x"></i>
          </div>

          <center>
            <ResponsiveContainer width="80%" height={350}>
              <BarChart
                data={[
                  { name: "Custom", uv: details?.category_6 },
                  { name: "Category1", uv: details?.category_7 },
                  { name: "Category2", uv: details?.category_8 },
                  { name: "Category3", uv: details?.category_9 },
                  { name: "Category4", uv: details?.category_10 },
                ]}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                barSize={50}
              >
                <XAxis
                  dataKey="name"
                  scale="point"
                  axisLine={{ stroke: "#FFFFFF", strokeWidth: 2 }}
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis
                  axisLine={{ stroke: "#FFFFFF", strokeWidth: 2 }}
                  tick={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="uv"
                  fill="#F0C3F1"
                  background={{ fill: "#030303" }}
                />
              </BarChart>
            </ResponsiveContainer>
          </center>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "50px",
            marginLeft: "100px",
          }}
        >
          {save && chargeCust ? (
            <button
              onClick={() => putDashboardDetails()}
              style={{
                width: "600px",
                padding: "10px",
                backgroundColor: "#6741D9",
                border: "none",
                borderRadius: "15px",
                color: "#FFFFFF",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Save
            </button>
          ) : (
            <button
              style={{
                width: "600px",
                padding: "10px",
                backgroundColor: "#C2C2C2",
                border: "none",
                borderRadius: "15px",
                color: "#FFFFFF",
                fontSize: "16px",
                cursor: "pointer",
              }}
              disabled={true}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
