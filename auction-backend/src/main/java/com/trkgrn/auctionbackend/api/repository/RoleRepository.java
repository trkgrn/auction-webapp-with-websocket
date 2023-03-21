package com.trkgrn.auctionbackend.api.repository;

import com.trkgrn.auctionbackend.api.model.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {
}
