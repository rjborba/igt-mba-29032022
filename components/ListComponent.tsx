import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface ListComponentProps {
  data: any[];
  setPageIndex: Dispatch<SetStateAction<number>>;
  pageIndex: any;
}

const ListComponent = ({
  data,
  setPageIndex,
  pageIndex,
}: ListComponentProps) => {
  const [filterText, setFilterText] = useState("");
  const [filteredList, setFilterdList] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setFilterdList(
        data.filter((item: any) =>
          item.name.toLowerCase().includes(filterText.toLowerCase().trim())
        )
      );
    } else {
      setFilterdList([]);
    }
  }, [data, filterText]);

  return (
    <div>
      <input
        placeholder={"Filtre por nome"}
        onChange={(event) => setFilterText(event.target.value)}
        value={filterText}
      />
      <button
        onClick={() => {
          setPageIndex((oldIndex) => oldIndex + 1);
        }}
      >
        Next
      </button>
      <ul>
        {filteredList.map((item) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <div>{item.year_established}</div>
            <div>{item.country}</div>
            <div>{item.trade_volume_24h_btc}</div>
            <div>{item.trust_score}</div>
            {item.image && !item.image.includes("missing_small") && (
              <Image src={item.image} width={50} height={50} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListComponent;
