export let socket: WebSocket;
export let message: string;

export const connectSocket = (webSocket: WebSocket) => {
  socket = webSocket;
};

export const disconnectSocket = () => {
  socket.close();
};

export const setMessage = () => {
  message = "";
};
