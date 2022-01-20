import Box from "@mui/material/Box";
import "./Layout.css";
const Layout: React.FC<{ diplayClass: string }> = (props) => {
  return <Box className={props.diplayClass}>{props.children}</Box>;
};

export default Layout;
