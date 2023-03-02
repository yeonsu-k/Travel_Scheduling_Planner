import React, { useEffect, useState } from "react";
import SearchListCard from "./SearchListCard";

function SearchList() {
  const [list, setCardList] = useState<{ id: number; image: string; name: string }[]>([]);

  return (
    <>
      {list.map((card, index) => {
        return (
          <div key={index}>
            <SearchListCard id={card.id} image={card.image} name={card.name} />
          </div>
        );
      })}
    </>
  );
}

export default SearchList;
