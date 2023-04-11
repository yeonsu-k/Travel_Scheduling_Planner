package com.newsainturtle.auth.controller;

import com.newsainturtle.auth.dto.EmailDuplicateCheckRequest;
import com.newsainturtle.auth.dto.EmailDuplicateCheckResponse;
import com.newsainturtle.common.dto.BaseResponse;
import com.newsainturtle.user.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.nio.charset.StandardCharsets;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.doReturn;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
@DisplayName("인증 컨트롤러 테스트")
class AuthControllerTest {
    @InjectMocks
    private AuthController authController;
    @Mock
    private UserService userService;

    private MockMvc mockMvc;

    @BeforeEach
    void init() {
        mockMvc = MockMvcBuilders.standaloneSetup(authController).build();
    }

    @Test
    @DisplayName("[성공] - 이메일 중복 체크 - 이미 가입된 이메일")
    void emailDuplicateCheck() throws Exception {
        //given
       /* final String url = "/api/auth/email";
        final EmailDuplicateCheckRequest emailDuplicateCheckRequest = EmailDuplicateCheckRequest.builder()
                .email("tjdtn123@naver.com").build();
        doReturn(
                EmailDuplicateCheckResponse.builder().isDuplicate(false).build()
        ).when(userService).emailDuplicateCheck(emailDuplicateCheckRequest);
        //when

        final ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.get(url));
        final String response = resultActions.andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);
        //then
        System.out.println("-----");
        System.out.println(response);
        System.out.println("-----");
        assertNotNull(response);*/
    }

}