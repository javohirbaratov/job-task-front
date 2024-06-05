import { useMemo } from "react";
import { useGetDocumentQuery } from "../app/services/document";

export default function Documents() {

  // Api
  const { data, isLoading } = useGetDocumentQuery();
  // Memo
  const filterData = useMemo(() => {
    if (data?.success && data.data) {
      return data.data;
    }
    return [];
  }, [data]);
  console.log(filterData);
  
  return (
    <>
      Document
    </>
  );
}
