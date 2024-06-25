package com.example.demo.activity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Document(collection="activities")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Activity {
    @Id
    private String id;
    private String emailId;
    private String type="Others",title,description,place,date,time;
    private String status = "ongoing";
    private List<String> joinedUsers = new ArrayList<>();

    public void appendJoinedUsers(String emailId){
        joinedUsers.add(emailId);
    }
}
