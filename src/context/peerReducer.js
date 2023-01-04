import { ADD_PEER, REMOVE_PEER } from "./peerActions";

//reducer function for peer
export const peersReducer = (state, action) => {
  //Handle different action type strings
  switch (action.type) {
    //Add peer
    case ADD_PEER:
      return {
        ...state,
        [action.payload.peerId]: {
          stream: action.payload.stream,
        },
      };
    //Remove peer
    case REMOVE_PEER:
      const { [action.payload.peerId]: deleted, ...rest } = state;
      return rest;
    //Default returns state as is
    default:
      return { ...state };
  }
};
