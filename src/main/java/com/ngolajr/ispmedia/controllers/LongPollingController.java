package com.ngolajr.ispmedia.controllers;

import com.ngolajr.ispmedia.services.LongPollingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.concurrent.ConcurrentLinkedQueue;

@RestController
@RequestMapping(path = "/api/notifications")
@RequiredArgsConstructor
public class LongPollingController {
    private final LongPollingService pollingService;
    private final ConcurrentLinkedQueue<DeferredResult<String>> requests = new ConcurrentLinkedQueue<>();

    @GetMapping("/{username}")
    public DeferredResult<String> getNotifications() {
        DeferredResult<String> deferredResult = new DeferredResult<>(30000L);
        requests.add(deferredResult);

        deferredResult.onTimeout(() -> {
            requests.remove(deferredResult);
            deferredResult.setResult("No new notifications");
        });

        return deferredResult;
    }
}
