package com.example.demo.user;

import com.example.demo.activity.Activity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection="users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private String emailId;
    private String password, name;
    private List<String> createdActivities;
    private List<String> joinedActivities;
    private List<String> buddies;

    public void appendCreatedActivity(String id){
        createdActivities.add(id);
    }

    public void appendJoinedActivity(String id){
        joinedActivities.add(id);
    }

    public void appendBuddy(String buddyEmailId){
        buddies.add(buddyEmailId);
    }

    public void removeBuddy(String buddyEmailId){
        buddies.remove(buddyEmailId);
    }

    public boolean isMyActivity(String activityId){
        return createdActivities.contains(activityId) || joinedActivities.contains(activityId);
    }

    public void removeJoinedActivity(String activityId) {
        joinedActivities.remove(activityId);
    }
}
