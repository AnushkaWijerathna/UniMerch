// package com.vau.UniMerch.UniMerch.controller;

// import com.vau.UniMerch.UniMerch.model.Club;
// import com.vau.UniMerch.UniMerch.service.ClubService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;

// import java.io.IOException;
// import java.util.Base64;
// import java.util.List;

// @RestController
// @RequestMapping("/api/clubs")
// @CrossOrigin(origins = "http://localhost:3000")
// public class ClubController {

//     @Autowired
//     private ClubService service;

//     @PostMapping
//     public Club create(@RequestBody Club club){
//         if (service.findByAdminId(club.getAdminId()) != null) {
//             throw new RuntimeException("Admin already has a club");
// }
//         return service.create(club);
//     }

//     @GetMapping
//     public List<Club> getAll(){
//         return service.getAll();
//     }

//     @GetMapping("/{id}")
//     public Club getClubById(@PathVariable String id){
//         return service.getClubById(id);
//     }

    
    
//     @PutMapping("/{mongoId}")
// public Club update(@PathVariable String mongoId, @RequestBody Club updated) {

//     Club club = service.getClubById(mongoId);

//     club.setId(updated.getId()); // "debate"
//     club.setName(updated.getName());
//     club.setDesc(updated.getDesc());
//     club.setEmoji(updated.getEmoji());
//     club.setBannerImageUrl(updated.getBannerImageUrl());
//     club.setPickupLocation(updated.getPickupLocation());
//     club.setPickupDay(updated.getPickupDay());
//     club.setSecretaryEmail(updated.getSecretaryEmail());
//     club.setAdminEmail(updated.getAdminEmail());
//     club.setAdminId(updated.getAdminId());

//     return service.save(club);
// }
// }

package com.vau.UniMerch.UniMerch.controller;

import com.vau.UniMerch.UniMerch.model.Club;
import com.vau.UniMerch.UniMerch.service.ClubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/clubs")
@CrossOrigin(origins = "http://localhost:3000")
public class ClubController {

    @Autowired
    private ClubService service;

    // CREATE
    @PostMapping
    public Club create(@RequestBody Club club) {
        return service.save(club);
    }

    // GET ALL
    @GetMapping
    public List<Club> getAll() {
        return service.getAll();
    }

    // GET BY MONGO ID
    @GetMapping("/{id}")
    public Club getClub(@PathVariable String id) {
        return service.getClubByMongoId(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Club update(
            @PathVariable String id,
            @RequestBody Club updatedClub
    ) {

        Club existing = service.getClubByMongoId(id);

        if (existing == null) {
            throw new RuntimeException("Club not found");
        }

        existing.setId(updatedClub.getId());
        existing.setName(updatedClub.getName());
        existing.setDesc(updatedClub.getDesc());
        existing.setEmoji(updatedClub.getEmoji());
        existing.setBannerImageUrl(updatedClub.getBannerImageUrl());
        existing.setPickupLocation(updatedClub.getPickupLocation());
        existing.setPickupDay(updatedClub.getPickupDay());
        existing.setSecretaryEmail(updatedClub.getSecretaryEmail());
        existing.setAdminEmail(updatedClub.getAdminEmail());
        existing.setAdminId(updatedClub.getAdminId());

        return service.save(existing);
    }

    // FIND CLUB BY ADMIN
    @GetMapping("/admin/{adminId}")
    public Club getByAdmin(@PathVariable String adminId) {
        return service.findByAdminId(adminId);
    }
}