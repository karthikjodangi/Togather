package com.example.demo.DTO;

import com.example.demo.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Buddy {
    private String userEmailId;
    private String buddyEmailId;
}
