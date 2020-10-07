import React from "react";
import { LOCATION } from "common/AppConstant";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import Arrow from "@material-ui/icons/ArrowRightAlt";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: "100%",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

const dashBoardImg = Object.entries(LOCATION)
  .filter(([_, location]) => location.menu)
  .map(([_, location]) => {
    const { label, path, img } = location;
    return {
      img,
      label,
      path,
    };
  });

function Dashboard({ history }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">Dashboard</ListSubheader>
        </GridListTile>
        {dashBoardImg.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.label} />
            <GridListTileBar
              title={tile.label}
              actionIcon={
                <IconButton
                  aria-label={`info about ${tile.label}`}
                  className={classes.icon}
                  onClick={() => history.push(`${tile.path}`)}
                >
                  <Arrow style={{ color: green[500] }} />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
export default Dashboard;
