interface TokenResponse {
  Token: string;
}

interface Action {
  type: "REGISTER" | "LOGIN";
}

const initialState: TokenResponse = {
  Token: "",
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "REGISTER":
      return { ...state };
    case "LOGIN":
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
