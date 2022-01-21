import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import styles from "./landingpage.module.css";
import Button from "@mui/material/Button";
const Landingpage: React.FC<{}> = () => {
  const history = useNavigate();
  const routeHandler = (page: string) => {
    history(`navigate/${page}`);
  };
  return (
    <>
      <Box className={styles.btn__explorer}>
        <Button
          variant="contained"
          onClick={() => routeHandler("people")}
          color="primary"
        >
          People
        </Button>
        <Button
          variant="contained"
          onClick={() => routeHandler("planets")}
          color="primary"
        >
          Planet
        </Button>
        <Button
          variant="contained"
          onClick={() => routeHandler("films")}
          color="primary"
        >
          Movie
        </Button>
      </Box>
    </>
  );
};

export default Landingpage;
