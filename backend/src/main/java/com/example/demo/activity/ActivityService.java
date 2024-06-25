package com.example.demo.activity;

import com.example.demo.DTO.JoinRequest;
import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ActivityService {
    @Autowired
    private ActivityRepository activityRepository;
    @Autowired
    private UserRepository userRepository;

    public List<Activity> allActivities(){ return activityRepository.findAll();}

    public Activity addActivity(Activity activity){
        Activity retActivity = activityRepository.save(activity);
        String emailId = retActivity.getEmailId();
        String id = retActivity.getId();
        User user = userRepository.findByEmailId(emailId);
        user.appendCreatedActivity(id);
        userRepository.save(user);
        return retActivity;
    }
    public List<Activity> getActivitiesByEmailId(String emailId) {
        return activityRepository.findByEmailId(emailId);
    }

    public List<Activity> getActivitiesByType(String type,String emailId) {
//        return activityRepository.findAll().stream().filter(activity -> activity.getType().equals(type)).toList();
        List<Activity> activities = activityRepository.findByType(type);
        User user = userRepository.findByEmailId(emailId);
        List<Activity> retActivities = new ArrayList<>();
        int i = 0;
        int size = activities.size();
        while(i < size){
            if(!(user.isMyActivity(activities.get(i).getId()))){
                retActivities.add(activities.get(i));
            }
            i++;
        }
        return retActivities;
    }

    public String updateJoinDetails(JoinRequest joinRequest) {
//        System.out.println(joinRequest.getEmailId()+" "+joinRequest.getId());

        Optional<Activity> activity = activityRepository.findById(joinRequest.getId());
        User user = userRepository.findByEmailId(joinRequest.getEmailId());
        if(user.isMyActivity(joinRequest.getId())){
            return "self activity";
        }
        if(activity.isPresent()){
            activity.get().appendJoinedUsers(joinRequest.getEmailId());
            activityRepository.save(activity.get());
        }

//        System.out.println(user.getName());
        user.appendJoinedActivity(joinRequest.getId());
        userRepository.save(user);
        return "success";
    }

    public String leaveActivity(JoinRequest joinRequest) {
        System.out.println(joinRequest.getEmailId() + " " + joinRequest.getId());
        Optional<Activity> optionalActivity = activityRepository.findById(joinRequest.getId());

        if (optionalActivity.isPresent()) {

            Activity activity = optionalActivity.get();

            if (activity.getJoinedUsers().contains(joinRequest.getEmailId())) {
                activity.getJoinedUsers().remove(joinRequest.getEmailId());
                activityRepository.save(activity);

                User user = userRepository.findByEmailId(joinRequest.getEmailId());
                user.removeJoinedActivity(joinRequest.getId());
                userRepository.save(user);
                return "success";
            } else {
                return "User is not part of this activity";
            }
        } else {
            return "Activity not found";
        }
    }

    public String updateActivityStatus(String id, String newStatus) {
        Activity activity = activityRepository.findById(id).orElse(null);
        if (activity != null) {
            activity.setStatus(newStatus);
            activityRepository.save(activity);
            return "success";
        }
        return "Activity not found";
    }
}
