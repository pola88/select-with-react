import React, { useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

import "./App.css";

const defaultTheme = createTheme({
  components: {
    MuiAlert: {
      styleOverrides: {
        message: {
          width: "90%",
        },
        root: {},
      },
    },
  },
});

const items = ["India", "USA", "France"];

function App(): JSX.Element {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const toggleSelection = (item: number, isChecked: boolean): void => {
    if (isChecked) {
      setSelectedItems(value => value.filter(index => index !== item));
      if (selectAll) {
        setSelectAll(false);
      }
    } else {
      const newSelectedNotifications = [...selectedItems, item];
      setSelectedItems(newSelectedNotifications);
      if (newSelectedNotifications.length === items.length) {
        setSelectAll(true);
      }
    }
  };

  const selectedIndeterminate = useMemo(() => {
    return selectedItems.length && !selectAll
      ? selectedItems.length !== items.length
      : false;
  }, [selectedItems, items, selectAll]);

  const onClickSelectAll = (isChecked: boolean): void => {
    if (selectedIndeterminate) {
      setSelectAll(true);
    } else if (!isChecked) {
      setSelectedItems([...Array(items.length).keys()]);
    } else {
      setSelectedItems([]);
    }
    setSelectAll(!isChecked);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItem key="select_all" disablePadding>
          <ListItemButton
            role={undefined}
            onClick={() => onClickSelectAll(selectAll)}
            dense>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selectAll}
                indeterminate={selectedIndeterminate}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText primary="Select all" />
          </ListItemButton>
        </ListItem>
        {items.map((value, index) => {
          const labelId = `checkbox-list-label-${index}`;
          const isChecked = selectedItems.includes(index) || selectAll;
          return (
            <ListItem key={value} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={() => toggleSelection(index, isChecked)}
                dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={isChecked}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </ThemeProvider>
  );
}

export default App;
