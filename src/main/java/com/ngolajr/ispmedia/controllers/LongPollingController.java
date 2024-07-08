package com.ngolajr.ispmedia.controllers;

import com.ngolajr.ispmedia.entities.NotificationEvent;
import com.ngolajr.ispmedia.services.LongPollingService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

@RestController
@RequestMapping(path = "/api/notifications")
@RequiredArgsConstructor
public class LongPollingController {
    private final LongPollingService pollingService;
    private final ConcurrentHashMap<String, ConcurrentLinkedQueue<DeferredResult<String>>> userRequests = new ConcurrentHashMap<>();

    @GetMapping("/{username}")
    public DeferredResult<String> getNotifications(@PathVariable String username) {
        DeferredResult<String> deferredResult = new DeferredResult<>(30000L);

        userRequests.putIfAbsent(username, new ConcurrentLinkedQueue<>());
        userRequests.get(username).add(deferredResult);

        deferredResult.onTimeout(() -> {
            userRequests.get(username).remove(deferredResult);
            deferredResult.setResult("No new notifications for " + username);
        });

        pollingService.addUsernameToCheck(username);

        return deferredResult;
    }

    @EventListener
    public void handleNotificationEvent(NotificationEvent event) {
        String username = event.getUsername();
        if (userRequests.containsKey(username)) {
            for (DeferredResult<String> deferredResult : userRequests.get(username)) {
                deferredResult.setResult(event.getMessage());
            }
            userRequests.get(username).clear();
        }
    }
}
