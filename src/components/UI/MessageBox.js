import { Message } from "rsuite";
import styled from "styled-components";
import merge from "lodash/merge";

const MessageBox = styled(Message)(({ theme, styles }) =>
  merge(
    {
      "&.rs-message-show": {
        marginBottom: theme.spacings.m,
      },
      "& .rs-message-container": {
        textAlign: "left",
        fontWeight: "500",
        padding: theme.spacings.s,
      },
    },
    styles
  )
);

export default MessageBox;
