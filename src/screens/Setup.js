import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { updateUserSettings } from "../store/authentication/authenticationSlice";
import { FormBuilder } from "../components/Form";
import { Card, Text, MessageBox } from "../components/UI";
import getError from "../utils/getError";

const AccountScreenContainer = styled.div(({ theme }) => ({
  ...theme.utils.flexCenter,
  ...theme.utils.fitParent,
}));

const formConfig = ({ dispatch, history }) => ({
  title: "Account setup",
  onSubmit: async (values, actions) => {
    try {
      actions.setSubmitting(true);

      await dispatch(updateUserSettings(values));

      history.push("/");
    } catch (error) {
      const submissionError = getError(error).message;

      actions.setErrors({ submissionError });
    }
  },
  buttons: [
    {
      text: "Save Settings",
      props: {
        block: true,
        appearance: "primary",
        type: "submit",
      },
    },
  ],
  sections: [
    {
      fields: [
        {
          name: "coinspotKey",
          placeholder: "Coinspot API Key",
        },
        {
          name: "coinspotSecret",
          placeholder: "Coinspot API Secret",
          Below: () => (
            <MessageBox
              styles={{ "& h5": { fontSize: "15px" } }}
              type="warning"
              title="Why do we need this?"
              description={
                <Text>
                  We use your READ ONLY api key so we can retrieve your coin
                  balances to calculate useful information for you.
                  <br />
                  <br />
                  We don't store your data! This is a service that calculates
                  and formats your coin data for display purposes only.
                  <br />
                  <br />
                  You can generate a new api key & secret at: <br />
                  <a href="https://www.coinspot.com.au/my/apigeneratekey">
                    https://www.coinspot.com.au/my/apigeneratekey
                  </a>
                </Text>
              }
            ></MessageBox>
          ),
        },
      ],
    },
  ],
});

const SetupScreen = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const config = useMemo(() => formConfig({ dispatch, history }), [
    dispatch,
    history,
  ]);

  return (
    <AccountScreenContainer>
      <Card>
        <FormBuilder formConfig={config} />
      </Card>
    </AccountScreenContainer>
  );
};

export default SetupScreen;
