package com.example.demo.user;

import com.example.demo.DTO.Buddy;
import com.example.demo.activity.Activity;
import com.example.demo.activity.ActivityRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User saveUser(User user){
        if (userRepository.findByEmailId(user.getEmailId()) != null) {
            return null; // User already exists
        }
        user.setJoinedActivities(new ArrayList<String>());
        user.setCreatedActivities(new ArrayList<String>());
        user.setBuddies(new ArrayList<String>());
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        return userRepository.save(user);
    }

    public User findByEmailIdAndPassword(String emailId, String password) {
        User user = userRepository.findByEmailId(emailId);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
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

    public List<User> getBuddies(String emailId) {
        List<User> users = userRepository.findAll();
        User user = userRepository.findByEmailId(emailId);
        users.remove(user);

        List<String> buddies = user.getBuddies();
        int i =0, buddiesSize = buddies.size();
        while(i < buddiesSize) {
            User bd = userRepository.findByEmailId(buddies.get(i));
            users.remove(bd);
            i++;
        }
        return users;
    }

    public List<User> getMyBuddies(String emailId) {
        User user = userRepository.findByEmailId(emailId);
        List<String> buddies = user.getBuddies();
        List<User> users = new ArrayList<>();
        int i =0, buddiesSize = buddies.size();
        while(i < buddiesSize) {
            User bd = userRepository.findByEmailId(buddies.get(i));
            users.add(bd);
            i++;
        }
        return users;
    }

    public String addBuddy(Buddy buddy) {
        String emailId = buddy.getUserEmailId();
        User user = userRepository.findByEmailId(emailId);
        String bd = buddy.getBuddyEmailId();
        user.appendBuddy(bd);
        userRepository.save(user);
        return bd;
    }

    public String removeBuddy(Buddy buddy) {
        String emailId = buddy.getUserEmailId();
        User user = userRepository.findByEmailId(emailId);
        String bd = buddy.getBuddyEmailId();
        user.removeBuddy(bd);
        userRepository.save(user);
        return bd;
    }

    public User buddyProfile(String buddyEmailId) {
        User user;
        user = userRepository.findByEmailId(buddyEmailId);
        return user;
    }
}
