package com.example.demo.activity;

import com.example.demo.DTO.JoinRequest;
import com.example.demo.user.User;
import com.example.demo.user.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
//import org.springframework.webpos.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/activities")
public class ActivityController {
    @Autowired
    private UserService userService;
    @Autowired
    private ActivityService activityService;

    @GetMapping
    public ResponseEntity<List<Activity>> getAllActivities() {
        return new ResponseEntity<>(activityService.allActivities(), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Activity> createOrUpdateActivity(@RequestBody Activity activity) {
        return new ResponseEntity<>(activityService.addActivity(activity), HttpStatus.CREATED);
    }

    @GetMapping("/join/{type}/{emailId}")
    public ResponseEntity<List<Activity>> getActivitiesByType(@PathVariable String type,@PathVariable String emailId) {
        List<Activity> activities = activityService.getActivitiesByType(type,emailId);
        return ResponseEntity.ok(activities);
    }

    @PostMapping("/joinUpdate")
    public ResponseEntity<String> updateJoinDetails(@RequestBody JoinRequest joinRequest) {
        System.out.println(joinRequest.getId());
        String res = activityService.updateJoinDetails(joinRequest);
        if(res.equals("success")){
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        return ResponseEntity.status((HttpStatus.NOT_FOUND)).body(res);
    }

    @PostMapping("/leave")
    public ResponseEntity<String> leaveActivity(@RequestBody JoinRequest joinRequest) {
        String res = activityService.leaveActivity(joinRequest);
        if (res.equals("success")) {
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
    }


    @PutMapping("/updateStatus/{id}")
    public ResponseEntity<String> updateActivityStatus(@PathVariable String id, @RequestParam String status) {
        String res = activityService.updateActivityStatus(id, status);
        if(res.equals("success")){
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
    }

}
