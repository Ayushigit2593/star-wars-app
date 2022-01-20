import { useState, useEffect } from "react";
import { peopleDisplayField } from "../helper/helper";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { getSwapApiData } from "../helper/helper";
import { dataSliceAction } from "../store/dataslice";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const DetailData: React.FC<{}> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [detailData, setDetailData] = useState({});
  const [loading, setLoading] = useState(false);
  const { type, page } = useParams();
  const errorMessage = useSelector(
    (state: RootState) => state.storedata.errorMessage
  );
  useEffect(() => {
    setLoading(true);
    getSwapApiData(type, page)
      .then((data) => {
        setDetailData(data);
        dispatch(dataSliceAction.setDetailData(data));
        setLoading(false);
      })
      .catch((e) =>
        dispatch(
          dataSliceAction.errorState(
            "Something went wrong.. Please try again later.."
          )
        )
      );
    dispatch(dataSliceAction.setCategory({ type, page }));
  }, [type, page, dispatch]);
  return (
    <>
      {loading && (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress></CircularProgress>
        </Box>
      )}
      {errorMessage && <div>{errorMessage}</div>}
      {!errorMessage &&
        Object.entries(detailData).map(([key, value], index) => {
          const labelValue: string = `${value}`;
          if (peopleDisplayField.includes(key)) {
            if (key === "name" || key === "title") {
              return (
                <Typography key={index + 1} variant="h5" component="h6">
                  {labelValue}
                </Typography>
              );
            }
            return (
              <TextField
                sx={{ display: "block", marginTop: "20px" }}
                key={index + 1}
                disabled
                id="standard-disabled"
                label={(key[0].toUpperCase() + key.slice(1)).replace("_", " ")}
                defaultValue={labelValue}
                variant="standard"
              />
            );
          }
        })}
    </>
  );
};

export default DetailData;
