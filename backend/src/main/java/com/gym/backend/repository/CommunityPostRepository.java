package com.gym.backend.repository;

import com.gym.backend.entity.CommunityPost;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommunityPostRepository extends JpaRepository<CommunityPost, Long> {
    List<CommunityPost> findAllByOrderByPostedAtDesc();
}
