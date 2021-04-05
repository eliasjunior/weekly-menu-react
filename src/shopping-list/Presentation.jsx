import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActionArea,
  CardActions,
} from "@material-ui/core";
import CartCreateBtn from "./CartCreateBtn";
const IMG_SRC = "/recipe/checklist.jpg";
export default function Presentation() {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          style={{ height: 440, margin: 10, borderRadius: 5 }}
          image={IMG_SRC}
          title="Paella dish"
        ></CardMedia>
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          New Shopping List
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          You can add an entire recipe products to the shopping list or simply
          add multiple products
        </Typography>
      </CardContent>
      <CardActions>
        <CartCreateBtn></CartCreateBtn>
      </CardActions>
    </Card>
  );
}
