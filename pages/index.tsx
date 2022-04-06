import ListComponent from "@/components/ListComponent";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

export default function Home() {
  const [pageIndex, setPageIndex] = useState(1);

  const { data, error } = useSWR(
    `https://api.coingecko.com/api/v3/exchanges/?per_page=100&page=${pageIndex}`,
    fetcher
  );

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <ListComponent
      data={data}
      pageIndex={pageIndex}
      setPageIndex={setPageIndex}
    />
  );
}
