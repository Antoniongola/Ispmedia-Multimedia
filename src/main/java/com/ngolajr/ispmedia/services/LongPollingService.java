package com.ngolajr.ispmedia.services;

import com.ngolajr.ispmedia.repositories.UtilizadorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.concurrent.ConcurrentLinkedQueue;

@Service
@RequiredArgsConstructor
public class LongPollingService {
    private final UtilizadorRepository userRepo;
    private final ConcurrentLinkedQueue<DeferredResult<String>> requests = new ConcurrentLinkedQueue<>();

    public DeferredResult<String> getNotifications() {
        DeferredResult<String> deferredResult = new DeferredResult<>(30000L);
        requests.add(deferredResult);

        deferredResult.onTimeout(() -> {
            requests.remove(deferredResult);
            deferredResult.setResult("No new notifications");
        });

        return deferredResult;
    }

    public void sendNotification(String notification) {
        for (DeferredResult<String> deferredResult : requests) {
            deferredResult.setResult(notification);
        }
        requests.clear();
    }
}
