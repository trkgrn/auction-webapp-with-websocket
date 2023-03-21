package com.trkgrn.auctionbackend.api.service;

import com.trkgrn.auctionbackend.api.model.entity.Role;
import com.trkgrn.auctionbackend.api.repository.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Iterable<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    public Role getRoleById(Long id) {
        return roleRepository.findById(id).orElse(null);
    }

    public void deleteRoleById(Long id) {
        roleRepository.deleteById(id);
    }

    public Role updateRole(Role role, Long id) {
        Optional<Role> roleOptional = roleRepository.findById(id);
        if (roleOptional.isPresent()) {
            Role updatedRole = roleOptional.get();
            updatedRole.setRoleId(id);
            updatedRole.setName(role.getName());
            return roleRepository.save(updatedRole);
        }
        return null;
    }

}