import React from "react";
import { useParams } from "react-router-dom";
import { getSwapApiData } from "../helper/helper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataSliceAction } from "../store/dataslice";
import type { RootState, AppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";
import styles from "./Category.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListItemText from "@mui/material/ListItemText";
import PublicIcon from "@mui/icons-material/Public";
import MovieIcon from "@mui/icons-material/Movie";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Category: React.FC<{}> = () => {
  type dataModel = {
    name: string;
    title: string;
  };
  const [loading, setLoading] = useState(false);
  const { type } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const categoryData = useSelector(
    (state: RootState) => state.storedata.categoryData
  );
  const errorMessage = useSelector(
    (state: RootState) => state.storedata.errorMessage
  );
  useEffect(() => {
    setLoading(true);
    getSwapApiData(type)
      .then((data) => {
        dispatch(dataSliceAction.setCategoryData(data.results));
        setLoading(false);
      })
      .catch((e) =>
        dispatch(
          dataSliceAction.errorState(
            "Something went wrong.. Please try again later.."
          )
        )
      );

    dispatch(dataSliceAction.setCategory({ type }));
  }, [dispatch, type]);
  const history = useNavigate();
  const listClickHandler = (page: string) => {
    history(`/navigate/${type}/${page}`);
  };

  return (
    <>
      {loading && (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress></CircularProgress>
        </Box>
      )}
      {errorMessage && <Box>{errorMessage}</Box>}
      {!errorMessage && (
        <List>
          {categoryData.map((item: dataModel, index) => (
            <ListItem
              sx={{ borderBottom: "1px solid #ddd" }}
              disablePadding
              key={index + 1}
              onClick={() => listClickHandler(`${index + 1}`)}
            >
              <ListItemButton className={styles.list__block}>
                <ListItemIcon className={styles.category__icon}>
                  {type === "people" && <AccountCircleIcon></AccountCircleIcon>}
                  {type === "planets" && <PublicIcon></PublicIcon>}
                  {type === "films" && <MovieIcon></MovieIcon>}
                </ListItemIcon>
                <ListItemText>
                  {type === "films" ? item.title : item.name}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default Category;
