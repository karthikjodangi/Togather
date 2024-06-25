package com.example.demo.activity;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ActivityRepository extends MongoRepository<Activity, ObjectId> {
    List<Activity> findByEmailId(String emailId);
    List<Activity> findByType(String type);
    Optional<Activity> findById(String id);
}
