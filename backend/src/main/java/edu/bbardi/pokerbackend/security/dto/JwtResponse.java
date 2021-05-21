package edu.bbardi.pokerbackend.security.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class JwtResponse {
    private String token;
    private Long id;
    private String username;
    private String email;
    private Float balance;
    private List<String> roles;
}