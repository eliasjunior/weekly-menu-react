import React from "react";
import { AppWeekBar } from "../../header/AppWeekBar";
import ApiService from "../../service/ApiService";

class MenuPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipeItemList: []
    };
  }
  componentDidMount() {
    ApiService.get("recipe/week")
      .then(docs => {
        this.setState({ recipeItemList: docs });
      })
      .catch(reason => {
        console.error(reason);
      });
  }
  render() {
    return (
      <div>
        <AppWeekBar title="Menu"></AppWeekBar>
      </div>
    );
  }
}
export default MenuPage;
