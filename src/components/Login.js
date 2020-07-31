import React from "react";

import AppID from "ibmcloud-appid-js";

import Cookies from "js-cookie";

const keys = require("../keys.json");

export function Login() {
  const appID = React.useMemo(() => {
    return new AppID();
  }, []);

  // Client ID and discovery endpoint (IBM App ID -> Applications)
  const [errorState, setErrorState] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  (async () => {
    try {
      await appID.init({
        clientId: process.env.REACT_APP_SPA_CLIENT_ID,
        discoveryEndpoint: process.env.REACT_APP_WELL_KNOWN_ENDPOINT,
      });
    } catch (e) {
      setErrorState(true);
      setErrorMessage(e.message);
      console.log("CANNOT INITIALISE");
      console.log(appID);
    }
  })();

  // Login action (execute when click login button)
  const [welcomeDisplayState, setWelcomeDisplayState] = React.useState(false);
  const [loginButtonDisplayState, setLoginButtonDisplayState] = React.useState(
    true
  );
  const [userName, setUserName] = React.useState("");

  const loginAction = async () => {
    try {
      const tokens = await appID.signin(); // LOGIN WITH PROVIDED CLIENT DETAILS
      setErrorState(false);
      setLoginButtonDisplayState(false);
      setWelcomeDisplayState(true);
      setUserName(tokens.idTokenPayload.name);
      // Store JWT in user cookie
      Cookies.set("user", tokens.accessToken);
    } catch (e) {
      setErrorState(true);
      setErrorMessage(e.message);
    }

  };
  return (
    <div>
      {welcomeDisplayState && (
        <div> Welcome {userName}! You are now authenticated.</div>

      )}
      
      {loginButtonDisplayState && (
        <button
          className="text-blue-500 py-3 border-b block"
          id="login"
          onClick={loginAction}
        >
          Login
        </button>
      )}
      {errorState && <div style={{ color: "red" }}>{errorMessage}</div>}
    </div>
  );
}

export default Login;
