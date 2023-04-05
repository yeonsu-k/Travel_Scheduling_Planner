package com.newsainturtle.notification.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.newsainturtle.common.config.ServerEndpointConfig;
import com.newsainturtle.notification.dto.LiveNotificationResponse;
import org.springframework.stereotype.Service;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.*;

@Service
@ServerEndpoint(value = "/socket/notification/{email}", configurator = ServerEndpointConfig.class)
public class WebSocketService {

    private static Set<Session> users = Collections.synchronizedSet(new HashSet<>());
    private static HashMap<String, String> userInfos = new HashMap<>();

    @OnOpen
    public void onOpen(Session session, @PathParam("email") String email) {
        if (!email.equals("undefined") && !users.contains(session)) {
            users.add(session);
            userInfos.put(session.getId(), email);
        }
    }

    @OnMessage
    public void onMessage(Session session, String message) throws IOException {
        for (Session s : users) {
            s.getBasicRemote().sendText(message);
        }
    }

    @OnClose
    public void onClose(Session session) {
        if (users.contains(session)) {
            users.remove(session);
            userInfos.remove(session.getId());
        }
    }

    public void sendNewNotification(String email, LiveNotificationResponse liveNotificationResponse) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        String jsonStr = mapper.writeValueAsString(liveNotificationResponse);
        List<Session> receivers = new ArrayList<>();
        for (Map.Entry<String, String> entry : userInfos.entrySet()) {
            if (entry.getValue().equals(email)) {
                Session receiver = users.stream()
                        .filter(session -> session.getId().equals(entry.getKey()))
                        .findFirst()
                        .orElse(null);
                if (receiver != null) receivers.add(receiver);
            }
        }

        for (Session receiver : receivers) {
            receiver.getBasicRemote().sendText(jsonStr);
        }
    }
}