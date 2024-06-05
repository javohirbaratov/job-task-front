import { Button } from "@mui/material";
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from "material-react-table";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { IDocument, useGetDocumentQuery } from '../app/services/document';
import { main_routes } from "../constants/path";

interface IDocumentColum extends IDocument {
  key: number
}

export default function Documents() {

  //Navigate 
  const navigate = useNavigate()

  // Api
  const { data, isLoading } = useGetDocumentQuery();

  // Memo
  const filterData = useMemo(() => {
    if (data?.success && data.data) {
      const newData = data.data.map((item) => ({
        ...item,
        key: item.id
      }));
      return newData
    }
    return [];
  }, [data]);

  //handle navigate
  const toNavigate = (id: number | null) => {
    if (!id) throw new Error("`document` is required")
    
    navigate(main_routes.documentShow.replace(":id", id.toString()));
  };
  // columns
  const columns = useMemo<MRT_ColumnDef<IDocumentColum>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 50,
      },
      {
        accessorKey: "document_name",
        header: "DOCUMENT TITLE",
        size: 150,
      },
      {
        accessorKey: "created_at",
        header: "CREATED DATE",
        size: 150,
      },
      {
        accessorKey: "configuration_count",
        header: "DOCUMENT SIZE",
        size: 150,
      },
      {
        accessorKey: "key",
        accessorFn: (item) => (
          <Button onClick={() => toNavigate(item.id)}>Document preview</Button>
        ),
        header: "",
        size: 100,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: filterData,
    initialState: { density: "compact" },
    state: {
      isLoading,
    },
  });
  return (
    <div style={{ width: "100%" }}>
      <MaterialReactTable table={table} />
    </div>
  );
}
