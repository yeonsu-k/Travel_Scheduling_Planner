import Text from "components/Text";
import React, { useEffect, useState } from "react";
import styles from "./Search.module.css";
import SearchListCard from "./SearchListCard";
import { Box } from "@mui/material";

function SearchList() {
  const [list, setCardList] = useState<{ id: number; image: string; name: string }[]>([]);

  return (
    <div>
      <Box className={styles.center} my={1}>
        <Text value="추천 호텔" bold />
      </Box>
      {list.map((card, idx) => {
        return (
          <>
            <SearchListCard id={card.id} image={card.image} name={card.name} key={idx} />
          </>
        );
      })}
    </div>
  );
}

export default SearchList;
