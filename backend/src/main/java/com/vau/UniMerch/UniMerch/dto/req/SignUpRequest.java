package com.vau.UniMerch.UniMerch.dto.req;

import lombok.Data;

@Data
public class SignUpRequest {

    private String fullName;
    private String email;
    private String password;
    private String role;
}