import { Box, Button, TextField } from "@mui/material";
import { Reducer, useCallback, useReducer } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { gate } from "../api";

type ItemAction =
  | { type: "NEW_NAME"; payload: string }
  | { type: "NEW_PRICE"; payload: number }
  | { type: "NEW_ITEM"; payload: Item };

const initItem: Item = { name: "", price: 0 };

const itemReducer: Reducer<Item, ItemAction> = (state, action) => {
  switch (action.type) {
    case "NEW_NAME":
      return { ...state, name: action.payload };
    case "NEW_PRICE":
      if (Number.isSafeInteger(action.payload)) {
        return { ...state, price: action.payload };
      } else {
        return state;
      }
    case "NEW_ITEM":
      return { ...action.payload };
    default:
      return state;
  }
};

export default function NewItemPage() {
  const [itemInfo, dispatch] = useReducer(itemReducer, initItem);
  const navigate = useNavigate();
  const itemPostMutation = useMutation((item: Item) => gate.postItem(item), {
    onSuccess: () => {
      navigate("/item");
    },
  });

  const onPostClick = useCallback(() => {
    itemPostMutation.mutate(itemInfo);
  }, [itemInfo, itemPostMutation]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      paddingTop={"10%"}
    >
      <TextField
        id="outlined-basic"
        label="name"
        variant="outlined"
        onChange={(e) =>
          dispatch({ type: "NEW_NAME", payload: e.target.value })
        }
        value={itemInfo.name}
      />
      <TextField
        id="outlined-basic"
        label="price"
        variant="outlined"
        onChange={(e) =>
          dispatch({ type: "NEW_PRICE", payload: Number(e.target.value) })
        }
        value={itemInfo.price}
      />
      <Button onClick={onPostClick}>POST</Button>
    </Box>
  );
}
