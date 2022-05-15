import { Box, Button, CircularProgress, List, TextField } from "@mui/material";
import React, { Reducer, useCallback, useReducer } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
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
      return { ...state, price: action.payload };
    case "NEW_ITEM":
      return { ...action.payload };
    default:
      return state;
  }
};

export default function ItemPage() {
  const [itemInfo, dispatch] = useReducer(itemReducer, initItem);
  const { itemId } = useParams();
  const navigate = useNavigate();
  const itemQuery = useQuery(
    ["itemQuery", itemId],
    () => gate.getItem(Number(itemId)),
    {
      enabled: !Boolean(itemInfo.id),
      staleTime: 0,
      onSuccess(data) {
        console.log(data);
        dispatch({ type: "NEW_ITEM", payload: data });
      },
    }
  );
  const itemPutMutation = useMutation((item: Item) => gate.putItem(item));
  const itemDeleteMutation = useMutation((id: number) => gate.deleteItem(id), {
    onSuccess: () => {
      navigate("/item");
    },
  });

  const onPostClick = useCallback(() => {
    itemPutMutation.mutate(itemInfo);
  }, [itemInfo, itemPutMutation]);

  const onDeleteClick = useCallback(() => {
    itemDeleteMutation.mutate(itemInfo.id ?? -1);
  }, [itemDeleteMutation, itemInfo.id]);

  return itemQuery.isLoading ? (
    <CircularProgress />
  ) : itemQuery.isError ? (
    <>Error</>
  ) : (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      paddingTop={"10%"}
    >
      <TextField
        id="outlined-basic"
        disabled
        label="id"
        variant="outlined"
        value={itemInfo.id}
      />
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
      <Button onClick={onDeleteClick}>DELETE</Button>
    </Box>
  );
}
