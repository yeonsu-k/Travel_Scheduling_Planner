package com.newsainturtle.auth.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EmailDuplicateCheckResponse {
    private boolean DuplicateCheck;

}
