import React, { useEffect, useState } from "react";
import "../../Assets/css/App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const topBun = require("../../Assets/images/Top_Bun.png");
const bottomBun = require("../../Assets/images/bottom_Bun.png");
const LetturePic = require("../../Assets/images/lettuce.png");
const BaconPic = require("../../Assets/images/bacon.png");
const MeatPic = require("../../Assets/images/meat.png");
const CheesePic = require("../../Assets/images/cheese.png");

function Home() {
  let navigate = useNavigate();

  // useState for Pice Count
  const [price, setPrice] = useState(3.0);
  // useState for disable button on less
  const [lettuceFlag, setLettuceFlag] = useState(true);
  const [baconFlag, setBaconFlag] = useState(true);
  const [cheeseFlag, setCheeseFlag] = useState(true);
  const [meatFlag, setMeatFlag] = useState(true);
  const [data, setData] = useState([]);

  //useState for Count
  const [lettuceCount, setLettuceCount] = useState(1);
  const [baconCount, setBaconCount] = useState(1);
  const [cheeseCount, setCheeseCount] = useState(1);
  const [meatCount, setMeatCount] = useState(1);

  // OnClick Function for Leeture More
  const lettureMore = () => {
    setPrice(price + 0.5);
    setLettuceFlag(false);
    setLettuceCount(lettuceCount + 1);
    setData([...data, { ["letture"]: lettuceCount }]);
  };

  // OnClick Function for Leeture Less
  const lettureLess = () => {
    if (price > 3 && lettuceCount > 1) {
      setPrice(price - 0.5);
      if (lettuceCount > 1) {
        setLettuceCount(lettuceCount - 1);
        const findIndexofObject = data.findIndex((object) => {
          return object.letture === lettuceCount - 1;
        });
        data.splice(findIndexofObject, 1);
        //console.log(data)
      }
    }

    // console.log(lettuceCount);
    if (lettuceCount === 1) {
      // seting flag false for disbale button
      setLettuceFlag(true);
    }
  };

  // OnClick Function for Bacon More
  const baconMore = () => {
    setPrice(price + 0.7);
    setBaconCount(baconCount + 1);
    setBaconFlag(false);

    setData([...data, { ["bacon"]: baconCount }]);
    //console.log (data);
  };

  // OnClick Function for Bacon less
  const baconLess = () => {
    if (price > 3 && baconCount > 1) {
      setPrice(price - 0.7);
      console.log("baconCount:", baconCount);
      setBaconCount(baconCount - 1);
      if (baconCount >= 0) {
        const findIndexofObject = data.findIndex((object) => {
          return object.bacon === baconCount - 1;
        });
        data.splice(findIndexofObject, 1);
      }
    }
    if (baconCount === 1) {
      // seting flag false for disbale button
      setBaconFlag(true);
    }
  };

  // OnClick Function for Cheese More
  const cheeseMore = () => {
    setPrice(price + 0.4);
    setCheeseFlag(false);
    setCheeseCount(cheeseCount + 1);
    setData([...data, { ["cheese"]: cheeseCount }]);
  };

  // OnClick Function for Cheese Less
  const cheeseLess = () => {
    if (price >= 3 && cheeseCount > 1) {
      setPrice(price - 0.4);
      setCheeseCount(cheeseCount - 1);
      const findIndexofObject = data.findIndex((object) => {
        return object.cheese === cheeseCount - 1;
      });
      data.splice(findIndexofObject, 1);
    }
    if (cheeseCount === 1) {
      // seting flag false for disbale button
      setCheeseFlag(true);
    }
  };

  // OnClick Function for Meat More
  const meatMore = () => {
    setPrice(price + 1.3);
    setMeatFlag(false);
    setMeatCount(meatCount + 1);
    setData([...data, { ["meat"]: meatCount }]);
  };

  // OnClick Function for Meat Less
  const meatLess = () => {
    if (price >= 3 && meatCount > 1) {
      setPrice(price - 1.3);
      setMeatCount(meatCount - 1);
      const findIndexofObject = data.findIndex((object) => {
        return object.meat === meatCount - 1;
      });
      data.splice(findIndexofObject, 1);
    } else {
      // seting flag false for disbale button
      setMeatFlag(true);
    }
  };

  // Double Verify by
  // 1.Local Storage
  // 2. and send request to the backend and check the jwt token;
  const user = JSON.parse(window.localStorage.getItem("user"));

  const userLoginVerify = async () => {
    if (!user) {
      navigate("/login");
    }
  };

  // onClick  Save Button
  const saveMenu = async () => {
    const middleWareResponse = await axios.post("http://localhost:5000/home", user);
    if (middleWareResponse.status === 400 || !middleWareResponse) {
      navigate("/login");
    } else {
      const res = await axios.post("http://localhost:5000/savemenu", {
        token: user,
        lettuce: lettuceCount,
        bacon: baconCount,
        cheese: cheeseCount,
        meat: meatCount,
      });
      if (res.status === 400 || !res) {
        alert("There is problem while saveing..");
      } else {
        alert("Menu Save");
      }
    }
  };

  // When User Login to Restate the state
  const responseStateChanges = (lettuce, bacon, cheese, meat) => {
    let dbData = [...data];

    // Lettuce

    for (let i = 1; i < lettuce; i++) {
      dbData.push({ ["letture"]: i });
    }

    // Bacon

    for (let i = 1; i < bacon; i++) {
      dbData.push({ ["bacon"]: i });
    }

    // Cheese
    for (let i = 1; i < cheese; i++) {
      dbData.push({ ["cheese"]: i });
    }

    // Meat
    for (let i = 1; i < meat; i++) {
      dbData.push({ ["meat"]: i });
    }

    const finalPrice = meat * 1.3 + lettuce * 0.5 + bacon * 0.7 + cheese * 0.4 + .10;
    // Lettuce
    setLettuceFlag(false);
    setLettuceCount(lettuce);
    // Bacon
    setBaconCount(bacon);
    setBaconFlag(false);
    //Cheese
    setCheeseCount(cheese);
    setCheeseFlag(false);
    // Meat
    setMeatCount(meat);
    setMeatFlag (false);
    // Set Data for map
    setData(dbData);
    // Set Price
    setPrice(finalPrice);
  };

  // Check if there is some save menu in database
  const reStateTheDataFormDataBase = async function () {
    const res = await axios.post("http://localhost:5000/getMenuById", user);
    if (res.status === 200) {
      const lettuce = parseInt(res.data.lettuceCount);
      const bacon = parseInt(res.data.baconCount);
      const cheese = parseInt(res.data.cheeseCount);
      const meat = parseInt(res.data.meatCount);
      responseStateChanges(lettuce, bacon, cheese, meat);
    } else {
      alert("There is some Problem please try later....");
    }
  };

  // useEffect
  useEffect(() => {
    // Verify User Login or Not Function
    userLoginVerify();
    // Update the sates form Database
    reStateTheDataFormDataBase();
    console.log (user);
    
  }, []);

  return (
    <div>
      <div className="burger-container">
        <div className="scroll">
          <img alt="" className="topBunImage" src={topBun} />
          <div className="ingredients">
            {data.map((val, index) => {
              if (val.letture >= 1) {
                return (
                  <img
                    alt=""
                    className="ingredientImage"
                    src={LetturePic}
                    id={index + 1}
                    key={index}
                  />
                );
              } else if (val.bacon >= 1) {
                return (
                  <img
                    alt=""
                    className="ingredientImage"
                    src={BaconPic}
                    id={index + 1}
                    key={index}
                  />
                );
              } else if (val.cheese >= 1) {
                return (
                  <img
                    alt=""
                    className="ingredientImage"
                    src={CheesePic}
                    id={index + 1}
                    key={index}
                  />
                );
              } else if (val.meat >= 1) {
                return (
                  <img
                    alt=""
                    className="ingredientImage"
                    src={MeatPic}
                    id={index + 1}
                    key={index}
                  />
                );
              }
            })}
          </div>

          <img alt="" className="bottomBunImage" src={bottomBun} />
        </div>
      </div>
      <div className="footer">
        <div className="price-tag">Current Price: ${price.toFixed(2)}</div>

        <table className="items-add-footer">
          <tbody>
            <tr>
              <td>Lettuce</td>
              <td>
                <button
                  className="button-footer"
                  disabled={lettuceFlag}
                  onClick={() => lettureLess("letture")}
                >
                  Less{" "}
                </button>
              </td>
              <td>
                <button
                  className="button-footer"
                  onClick={() => lettureMore("letture")}
                >
                  More
                </button>
              </td>
            </tr>
            <tr>
              <td>Bacon</td>
              <td>
                <button
                  disabled={baconFlag}
                  className="button-footer"
                  onClick={() => baconLess("bacon")}
                >
                  Less{" "}
                </button>
              </td>
              <td>
                <button
                  className="button-footer"
                  onClick={() => baconMore("bacon")}
                >
                  More
                </button>
              </td>
            </tr>
            <tr>
              <td>Cheese</td>
              <td>
                <button
                  className="button-footer"
                  disabled={cheeseFlag}
                  onClick={(e) => cheeseLess("cheese")}
                >
                  Less{" "}
                </button>
              </td>
              <td>
                <button
                  className="button-footer"
                  onClick={(e) => cheeseMore(e)}
                >
                  More
                </button>
              </td>
            </tr>
            <tr>
              <td>Meat</td>
              <td>
                <button
                  className="button-footer"
                  disabled={meatFlag}
                  onClick={(e) => meatLess("meat")}
                >
                  Less{" "}
                </button>
              </td>
              <td>
                <button className="button-footer" onClick={(e) => meatMore(e)}>
                  More
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="footer-save-button">
          <button className="button-save-footer" onClick={saveMenu}>
            Save{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
