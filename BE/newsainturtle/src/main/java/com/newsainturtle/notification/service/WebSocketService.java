package com.newsainturtle.notification.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.newsainturtle.common.config.ServerEndpointConfig;
import com.newsainturtle.notification.dto.LiveNotificationResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.*;

@Slf4j
@Service
@ServerEndpoint(value= "/socket/notification/{email}", configurator = ServerEndpointConfig.class)
public class WebSocketService {

    private static Set<Session> users = Collections.synchronizedSet(new HashSet<Session>());
    private static HashMap<String, String> userInfos = new HashMap<>();

    @OnOpen
    public void onOpen(Session session, @PathParam("email") String email) throws Exception {
        log.info("open session : {}, clients={}", session.toString(), users);
        if (!users.contains(session)) {
            users.add(session);
            userInfos.put(session.getId(), email);
            log.info("session open : {} - {}", session, email);
            session.getBasicRemote().sendText("연결됐다아아아ㅏㅏ");
        } else {
            log.info("이미 연결된 session");
        }
    }

    @OnMessage
    public void onMessage(Session session, String message) throws IOException {
        log.info("receive message : {}", message);

        for (Session s : users) {
            log.info("send data : {}", message);
            s.getBasicRemote().sendText(message);
        }
    }

    @OnClose
    public void onClose(Session session) {
        log.info("session close : {}", session);
        if (!users.contains(session)) {
            users.remove(session);
            log.info("session close : {} - {}", session, userInfos.get(session.getId()));
            userInfos.remove(session.getId());
        } else {
            log.info("이미 끊긴 session");
        }
    }

    public void sendNewNotification(String email, LiveNotificationResponse liveNotificationResponse) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        String jsonStr = mapper.writeValueAsString(liveNotificationResponse);
        List<Session> receivers = new ArrayList<>();
        log.info("메세지 보냄 : {}", email);
        for(Map.Entry<String, String> entry : userInfos.entrySet()){
            if(entry.getValue().equals(email) ){
                Session receiver = users.stream()
                        .filter(session -> session.getId().equals(entry.getKey()))
                        .findFirst()
                        .orElse(null);
                if(receiver != null) receivers.add(receiver);
            }
        }

        for(Session receiver : receivers){
            log.info("receiver : {}", receiver);
            receiver.getBasicRemote().sendText(jsonStr);
            log.info("메세지 보냄 : {}", jsonStr);
        }
    }

}