package com.newsainturtle.auth.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EmailDuplicateCheckResponse {
    private boolean isDuplicate;

    public EmailDuplicateCheckResponse(boolean isDuplicate) {
        this.isDuplicate = isDuplicate;
    }

    public boolean getIsDuplicate() {
        return this.isDuplicate;
    }
}
