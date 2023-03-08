package com.newsainturtle.schedule.repository;

import com.newsainturtle.schedule.entity.ScheduleMember;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


@DataJpaTest
@DisplayName("일정에 포함된 회원")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class ScheduleMemberRepositoryTest {
    @Autowired
    private ScheduleMemberRepository scheduleMemberRepository;

    @Nested
    @DisplayName("[일정에 포함된 회원 조회]")
    class GetScheduleList{
        @Test
        @DisplayName("일정 포함된 회원 조회")
        void getScheduleList(){
            final String email = "test1@naver.com";
            //given
            final ScheduleMember scheduleMember = ScheduleMember.builder()
                    .userEmail(email).schedule(1L).build();
            final ScheduleMember scheduleMember2 = ScheduleMember.builder()
                    .userEmail(email).schedule(2L).build();
            scheduleMemberRepository.save(scheduleMember);
            scheduleMemberRepository.save(scheduleMember2);
            //when
            List<ScheduleMember> result = scheduleMemberRepository.findAllByUserEmail(email);
            //then
            assertThat(result).hasSize(2);
        }
    }

}