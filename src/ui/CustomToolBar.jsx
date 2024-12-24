import {
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarExport,
} from "@mui/x-data-grid";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter debounceMs={500} placeholder="Search..." />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default CustomToolbar;
