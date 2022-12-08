export function colImageName(name) {
  return {
    field: "name",
    minWidth: 220,
    flex: 1,
    headerName: name,
    renderCell: (cells) => {
      return (
        <div className="flex space-x-4 items-center ">
          <img
            className=" w-10 h-10"
            src={
              cells.row.imageUrl
                ? cells.row.imageUrl
                : "https://cdn-icons-png.flaticon.com/128/3188/3188580.png"
            }
          />
          <span className="font-semibold ">{cells.row.name}</span>
        </div>
      );
    },
  };
}
