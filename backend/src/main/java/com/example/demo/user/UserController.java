package com.example.demo.user;

import com.example.demo.DTO.Buddy;
import com.example.demo.activity.Activity;
import com.example.demo.activity.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private ActivityService activityService;

    @PostMapping("/signup")
    public ResponseEntity<User> signUp(@RequestBody User user) {
        User createdUser = userService.saveUser(user);
        if (createdUser == null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build(); // User already exists
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        User loggedInUser = userService.findByEmailIdAndPassword(user.getEmailId(), user.getPassword());
        if (loggedInUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(loggedInUser);
    }

    @GetMapping("/{emailId}")
    public ResponseEntity<Map<String, String>> getName(@PathVariable String emailId) {
        String name = userService.getName(emailId);
        if (name.equals("notfound")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        Map<String, String> response = new HashMap<>();
        response.put("name", name);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/activities/{emailId}")
    public ResponseEntity<List<Activity>> getActivities(@PathVariable String emailId) {
        List<Activity> activities = activityService.getActivitiesByEmailId(emailId);
        return ResponseEntity.ok(activities);
    }

    @GetMapping("/activities/created/{emailId}")
    public ResponseEntity<List<Activity>> getCreatedActivities(@PathVariable String emailId) {
        List<Activity> activities = userService.getCreatedActivities(emailId);
        return ResponseEntity.ok(activities);
    }

    @GetMapping("/activities/joined/{emailId}")
    public ResponseEntity<List<Activity>> getJoinedActivities(@PathVariable String emailId) {
        List<Activity> activities = userService.getJoinedActivities(emailId);
        return ResponseEntity.ok(activities);
    }

    @GetMapping("/addBuddies/{emailId}")
    public ResponseEntity<List<User>> getBuddies(@PathVariable String emailId){
        List<User> users = userService.getBuddies(emailId);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/myBuddies/{emailId}")
    public ResponseEntity<List<User>> getMyBuddies(@PathVariable String emailId){
        List<User> users = userService.getMyBuddies(emailId);
        return ResponseEntity.ok(users);
    }

    @PostMapping("/addBuddy")
    public ResponseEntity<String> addBuddy(@RequestBody Buddy buddy){
        String user = userService.addBuddy(buddy);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/removeBuddy")
    public ResponseEntity<String> removeBuddy(@RequestBody Buddy buddy){
        String user = userService.removeBuddy(buddy);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/buddies/profile/{buddyEmailId}")
    public ResponseEntity<User> buddyProfile(@PathVariable String buddyEmailId){
        User user = userService.buddyProfile(buddyEmailId);
        return ResponseEntity.ok(user);
    }
}
