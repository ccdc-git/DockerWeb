import { Button, CircularProgress, List, ListItem } from "@mui/material";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { gate } from "../api";

export default function ItemListPage() {
  const itemsQuery = useQuery("itemsQuery", () => gate.getItemList());
  const navigate = useNavigate();

  return itemsQuery.isLoading ? (
    <CircularProgress />
  ) : itemsQuery.isError ? (
    <>Error</>
  ) : (
    <>
      <List>
        {itemsQuery.data?.map((value, idx) => (
          <ListItem>
            <Button
              variant="outlined"
              size={"large"}
              onClick={() => navigate(`/item/${value.id}`)}
            >
              {value.id}
            </Button>
            <>
              {" "}
              {value.name} ${value.price}
            </>
          </ListItem>
        ))}
      </List>

      <Button
        variant="outlined"
        size={"large"}
        onClick={() => navigate(`/item/new`)}
      >
        NEW
      </Button>
    </>
  );
}
