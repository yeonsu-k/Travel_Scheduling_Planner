export let socket: WebSocket;

export const connectSocket = (email: string) => {
  socket = new WebSocket(process.env.REACT_APP_SOCKET_URL + email);

  socket.onopen = () => {
    console.log("connected");
  };
};

export const disconnectSocket = () => {
  socket.close();
};
