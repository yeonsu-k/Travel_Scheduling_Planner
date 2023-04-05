import React, { useState } from "react";
import Axios from "api/JsonAxios";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

function InsertData() {
  const [file, setFile] = useState();
  const [type, setType] = useState("1");

  const fileReader = new FileReader();

  const handleOnChange = (e: any) => {
    console.log("handleOnChange");
    setFile(e.target.files[0]);
  };

  const insert = async (data: any) => {
    if (data) {
      if (data.locationName.length > 20 || data.address.length > 50) return;
      // console.log(data);
      await Axios.post(`http://localhost:8080/api/schedule/basiclocation`, {
        address: data.address,
        latitude: data.latitude,
        locationName: data.locationName,
        longitude: data.longitude,
        regionId: 1,
        isHotel: type === "2",
        locationURL: data.locationURL,
      }).then((res: any) => {
        console.error(res);
      });
    }
  };

  const geocoder = new kakao.maps.services.Geocoder();

  const csvFileToArray = (string: any) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    if (csvHeader.includes("longitude")) {
      csvRows.map((i: any) => {
        // console.log(i);
        const split_list = i.split(`,"`).length === 2 ? i.split(`,"`) : i.split(`,`);
        const location_name = split_list[0].split(`"`)[0];
        // console.log(split_list);
        const split_list2 = split_list.length === 2 ? split_list[1].split(`"`) : split_list.slice(1);
        const address = split_list2[0];
        // console.log(split_list2);
        const split_list3 = split_list2.length === 4 ? split_list2.slice(1) : split_list2[1].split(`,`);
        const latitude = split_list3[0];
        const longitude = split_list3[1];
        const locationURL = split_list3[2];
        // console.log(split_list3);
        const tmp = {
          locationName: location_name,
          address: address,
          latitude: latitude,
          longitude: longitude,
          locationURL: locationURL,
        };
        insert(tmp);
      });
    } else {
      csvRows.map((i: any) => {
        const split_list = i.split(`,"`).length === 2 ? i.split(`,"`) : i.split(`,`);
        const location_name = split_list[0].split(`"`)[0];
        const address = split_list[1].split(`"`)[0];

        geocoder.addressSearch(address, function (result: any[], status: string) {
          if (status === kakao.maps.services.Status.OK) {
            const tmp = {
              locationName: location_name,
              address: address,
              latitude: result[0].y,
              longitude: result[0].x,
              locationURL: null,
            };
            insert(tmp);
          }
        });
      });
    }
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event: any) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  const changeRadioType = (e: any) => {
    setType(e.target.value);
  };

  return (
    <>
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <h1>csv파일 장소 데이터 넣기</h1>
        <br></br>
        <input type="radio" value="1" checked={type === "1"} onChange={changeRadioType} />
        <label>장소</label>

        <input type="radio" value="2" checked={type === "2"} onChange={changeRadioType} />
        <label>호텔</label>
        <form>
          <input type={"file"} id={"csvFileInput"} accept={".csv"} onChange={handleOnChange} />

          <button
            onClick={(e) => {
              handleOnSubmit(e);
            }}
          >
            IMPORT CSV
          </button>
        </form>
      </div>
    </>
  );
}

export default InsertData;
