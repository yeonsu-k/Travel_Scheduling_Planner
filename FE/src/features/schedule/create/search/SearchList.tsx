import React, { useEffect, useState } from "react";
import SearchListCard from "./SearchListCard";

function SearchList(props: { select: string }) {
  const [list, setCardList] = useState<{ id: number; image: string; name: string }[]>([]);
  return (
    <>
      {list.map((card, index) => {
        return (
          <div key={index}>
            <SearchListCard cardInfo={card} select={props.select} />
          </div>
        );
      })}
    </>
  );
}

export default SearchList;
