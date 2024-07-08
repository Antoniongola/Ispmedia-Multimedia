package com.ngolajr.ispmedia.entities;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class NotificationEvent extends ApplicationEvent {

    private final String message;
    private final String username;

    public NotificationEvent(Object source, String message, String username) {
        super(source);
        this.message = message;
        this.username = username;
    }
}
