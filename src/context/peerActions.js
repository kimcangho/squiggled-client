//Peer Actions as global constants
export const ADD_PEER = "ADD_PEER";
export const REMOVE_PEER = "REMOVE_PEER";

//Add a peer action to return object with type and payload
export const addPeerAction = (peerId, stream) => ({
  type: ADD_PEER,
  payload: { peerId, stream },
});

//Remove a peer action to return object with type and payload
export const removePeerAction = (peerId) => ({
  type: REMOVE_PEER,
  payload: { peerId },
});
