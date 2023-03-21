package com.trkgrn.auctionbackend.api.model.dto;

import com.trkgrn.auctionbackend.api.model.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDto {
    private Long userId;

    private String firstName;

    private String lastName;

    private String username;

    private Role role;
}
