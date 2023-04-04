import Axios from "api/JsonAxios";
import { noticeListProps } from "./Notice";
import api from "api/Api";
import { setNotiNumber } from "slices/mainSlice";
import { useAppDispatch } from "app/hooks";

export let socket: WebSocket;

const fireNotification = (title: string, options: object) => {
  new Notification(title, options);
};

export const connectSocket = (email: string) => {
  socket = new WebSocket(process.env.REACT_APP_SOCKET_URL + email);

  if (socket) {
    socket.onopen = () => {
      console.log("connected");
    };
    socket.onmessage = (event) => {
      console.log("메세지 옴: " + event.data);

      const data = JSON.parse(event.data);

      console.log("data: ", data.type);

      if (data.type === "friend") {
        console.log("friend");
        fireNotification("MYRO", {
          body: `${data.senderNickname}님이 ${data.content}을 보냈습니다.`,
        });
      } else if (data.type === "schedule") {
        fireNotification("MYRO", {
          body: `${data.senderNickname}님이 ${data.content} 일정을 공유했습니다.`,
        });
      }

      getNotification();
    };
    socket.onclose = (event) => {
      console.log("disconnect");
      console.log(event);
    };
    socket.onerror = (error) => {
      console.log("connection error ");
      console.log(error);
    };
  }
};

export const disconnectSocket = () => {
  socket.close();
};

let noticeList: noticeListProps[] = [];
const getNotification = async () => {
  const dispatch = useAppDispatch();

  let notificationCount = 0;

  await Axios.get(api.notification.notification())
    .then((res) => {
      console.log(res);
      noticeList = [...res.data.data.notifications];
      console.log("list", noticeList);

      noticeList.map((value, key) => {
        if (value.status === "NO_RESPONSE") {
          notificationCount++;
        }
      });

      console.log("cnt: ", notificationCount);
      dispatch(setNotiNumber({ notiNumber: notificationCount }));
    })
    .catch((err) => {
      console.log(err);
    });
};
