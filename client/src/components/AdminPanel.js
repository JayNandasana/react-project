import { Link } from "react-router-dom";
import { Card, Box } from "@mui/material";

export default function AdminPanel() {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        paddingTop="55px"
        height="100vh"
      > 
        <Link
          to="/AdminPanel/ButtonCompo"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Card sx={{ minWidth: 200, minHeight: 200, marginRight: 10 , borderRadius:7}}>
              <img src="/sample/manageBtnCompo.png" alt="templates" />
          </Card>
        </Link>
        <Link
          to="/AdminPanel/CheckboxCompo"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Card sx={{ minWidth: 200, minHeight: 200, marginRight: 10 ,borderRadius:7}}>
              <img src="/sample/manageCheckboxCompo.png" alt="templates" />
          </Card>
        </Link>
        <Link
          to="/AdminPanel/User"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Card sx={{ minWidth: 200, minHeight: 200 ,borderRadius:7}}>
              <img src="/sample/manageUser.png" alt="templates" />
          </Card>
        </Link>
      </Box>
    </>
  );
}
