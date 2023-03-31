import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectRegion, setRegion } from "slices/scheduleCreateSlice";
import Axios from "api/JsonAxios";
import api from "api/Api";
import styled from "@emotion/styled";
import { Stack } from "@mui/system";
import Button from "components/Button";

interface DestinationConfig {
  regionId: number;
  regionName: string;
  englishName: string;
}

interface Props {
  modalClose: () => void;
}

const SelectBox = styled.select`
  position: relative;
  width: 200px;
  padding: 8px;
  outline: none;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  align-self: center;
  cursor: pointer;
`;

const Option = styled.option`
  font-size: 14px;
  padding: 6px 8px;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #595959;
  }
`;

const InfoLocalSelect = ({ modalClose }: Props) => {
  const dispatch = useAppDispatch();
  const region = useAppSelector(selectRegion);
  const [currentValue, setCurrentValue] = useState<DestinationConfig>({
    regionId: region.id,
    regionName: region.name,
    englishName: "SEOUL",
  });
  const [searchLocal, setSearchLocal] = useState<DestinationConfig[]>([]);

  useEffect(() => {
    getLocalData();
  }, []);

  const getLocalData = async () => {
    await Axios.get(api.createSchedule.mainPlace())
      .then((res) => {
        setSearchLocal(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleOnChangeSelectValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // const value: DestinationConfig = JSON.parse(e.target.value);
    setCurrentValue(JSON.parse(e.target.value));
  };

  const savePlace = () => {
    dispatch(
      setRegion({
        id: currentValue.regionId,
        name: currentValue.regionName,
      }),
    );
    modalClose();
  };

  return (
    <>
      <Stack mb={2}>
        <SelectBox onChange={(e) => handleOnChangeSelectValue(e)}>
          {searchLocal.map((data) => (
            <Option
              key={data.regionId}
              value={JSON.stringify(data)}
              selected={currentValue.regionName === data.regionName}
            >
              {data.regionName}
            </Option>
          ))}
        </SelectBox>
      </Stack>
      <Button text="확인" color="main" radius onClick={savePlace} />
    </>
  );
};

export default InfoLocalSelect;
