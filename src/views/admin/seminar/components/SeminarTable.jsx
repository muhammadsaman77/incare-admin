import Card from "components/card";
import CardMenu from "./CardMenu";
import { useMemo, useEffect, useState } from "react";
import { useTable } from "react-table";
import axios from "axios";
export default function SeminarTable({ onOpen, onOpenUpdate }) {
  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "no",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Schedule",
        accessor: "schedule",
      },
      {
        Header: "Pamflet",
        accessor: "pamflet",
      },
      {
        Header: "Action",
        accessor: "action",
      },
    ],
    []
  );
  const [seminarData, setSeminarData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/seminars");
        const fetchedData = response.data.data;

        setSeminarData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const data = useMemo(
    () =>
      seminarData.map((tableData, index) => {
        return {
          id: tableData._id,
          no: index + 1,
          name: tableData.name,
          schedule: tableData.schedule,
          pamflet: tableData.pamflet,
        };
      }),
    [seminarData]
  );

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const handleDelete = async (id) => {
    try {
      const response = await axios({
        method: "delete",
        url: `http://127.0.0.1:3000/seminars/${id}`,
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error posting data:", error.message);
    }
  };
  return (
    <Card extra={"w-full h-full p-4 sm:overflow-x-auto"}>
      <div class="relative flex items-center justify-between">
        <div class="text-xl font-bold text-navy-700 dark:text-white">
          Seminar Table
        </div>
        <CardMenu onOpen={onOpen} />
      </div>

      <div class="mt-8 h-full overflow-x-scroll xl:overflow-hidden">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
                    {...column.getHeaderProps()}
                  >
                    <p className="text-base tracking-wide text-gray-600">
                      {column.render("Header")}
                    </p>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map((cell) => {
                    let data = "";
                    if (cell.column.Header === "Action") {
                      data = (
                        <span className="font-bold text-navy-700 dark:text-white">
                          <button
                            onClick={() =>
                              onOpenUpdate(
                                row.original.id,
                                row.original.name,
                                row.original.schedule
                              )
                            }
                            className="mr-2 rounded-full bg-blue-500 px-4 py-2 text-sm  font-medium text-white transition duration-200 hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-400 dark:text-white dark:hover:bg-blue-300 dark:active:bg-blue-200 "
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(row.original.id)}
                            className="rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200"
                          >
                            Delete
                          </button>
                        </span>
                      );
                    } else {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    }
                    return (
                      <td
                        className="pt-[14px] pb-[18px] sm:text-[14px]"
                        {...cell.getCellProps()}
                      >
                        {data}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
