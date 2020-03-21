import { red, green, blue, orange } from "@material-ui/core/colors";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";

export const stylesSelect = {
  content: {
    marginleft: "10px"
  }
};
export const stylesAlert = {
  MESSAGE_TYPE_ERROR: {
    theme: {
      snackContent: {
        backgroundColor: red[400],
        margin: "5px"
      }
    },
    icon: ErrorIcon
  },
  MESSAGE_TYPE_SUCCESS: {
    theme: {
      snackContent: {
        backgroundColor: green[400],
        margin: "5px"
      }
    },
    icon: CheckCircleIcon
  },
  MESSAGE_TYPE_INFO: {
    theme: {
      snackContent: { backgroundColor: blue[400], margin: "5px" }
    },
    icon: InfoIcon
  },
  MESSAGE_TYPE_WARNING: {
    theme: {
      snackContent: {
        backgroundColor: orange[400],
        margin: "5px"
      }
    },
    icon: WarningIcon
  }
};
