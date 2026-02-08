package com.gym.backend.repository;

import com.gym.backend.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    Optional<Subscription> findByUserIdAndIsActiveTrue(Long userId);
}
