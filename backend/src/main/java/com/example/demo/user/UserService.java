package com.example.demo.user;

import com.example.demo.activity.Activity;
import com.example.demo.activity.ActivityRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ActivityRepository activityRepository;

    public User saveUser(User user){
        if (userRepository.findByEmailId(user.getEmailId()) != null) {
            return null; // User already exists
        }
        user.setJoinedActivities(new ArrayList<String>());
        user.setCreatedActivities(new ArrayList<String>());
        return userRepository.save(user);
    }

    public User findByEmailIdAndPassword(String emailId, String password) {
        User user = userRepository.findByEmailId(emailId);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }

    public String getName(String emailId){
        User user = userRepository.findByEmailId(emailId);
        if(user == null){
            return "notfound";
        }
        return user.getName();
    }

    public List<Activity> getCreatedActivities(String emailId) {
        User user = userRepository.findByEmailId(emailId);
        List<Activity> activities = new ArrayList<>();
        String id;
        int activitiesSize = user.getCreatedActivities().size();
        int i = 0;
        while(i < activitiesSize){
            id = user.getCreatedActivities().get(i);
            Optional<Activity> activity = activityRepository.findById(id);
            if(activity.isPresent()){
                activities.add(activity.get());
            }
            i++;
        }
        return activities;
    }

    public List<Activity> getJoinedActivities(String emailId) {
        User user = userRepository.findByEmailId(emailId);
        List<Activity> activities = new ArrayList<>();
        String id;
        int activitiesSize = user.getJoinedActivities().size();
        int i = 0;
        while(i < activitiesSize){
            id = user.getJoinedActivities().get(i);
            Optional<Activity> activity = activityRepository.findById(id);
            if(activity.isPresent()){
                activities.add(activity.get());
            }
            i++;
        }
        return activities;
    }
}
