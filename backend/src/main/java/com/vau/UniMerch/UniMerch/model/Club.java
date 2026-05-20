// package com.vau.UniMerch.UniMerch.model;

// import lombok.*;
// import org.springframework.data.annotation.Id;
// import org.springframework.data.mongodb.core.mapping.Document;

// @Document("clubs")
// @Data
// @AllArgsConstructor
// @NoArgsConstructor
// public class Club {

//     @Id
//     private String _id;  

//     private String id;
//     private String name;
//     private String desc;
//     private String emoji;
//     private String bannerImageUrl;
//     private String pickupLocation;
//     private String pickupDay;
//     private String secretaryEmail;
//     private String adminEmail;
//     private String adminId;
    
// }

package com.vau.UniMerch.UniMerch.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "clubs")
public class Club {

    @Id
    private String _id; // Mongo ObjectId

    private String id; // debate, chess, dance

    private String name;
    private String desc;
    private String emoji;
    private String bannerImageUrl;
    private String pickupLocation;
    private String pickupDay;
    private String secretaryEmail;
    private String adminEmail;
    private String adminId;

    // getters & setters

    public String getMongoId() {
        return _id;
    }

    public void setMongoId(String mongoId) {
        this._id = mongoId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getEmoji() {
        return emoji;
    }

    public void setEmoji(String emoji) {
        this.emoji = emoji;
    }

    public String getBannerImageUrl() {
        return bannerImageUrl;
    }

    public void setBannerImageUrl(String bannerImageUrl) {
        this.bannerImageUrl = bannerImageUrl;
    }

    public String getPickupLocation() {
        return pickupLocation;
    }

    public void setPickupLocation(String pickupLocation) {
        this.pickupLocation = pickupLocation;
    }

    public String getPickupDay() {
        return pickupDay;
    }

    public void setPickupDay(String pickupDay) {
        this.pickupDay = pickupDay;
    }

    public String getSecretaryEmail() {
        return secretaryEmail;
    }

    public void setSecretaryEmail(String secretaryEmail) {
        this.secretaryEmail = secretaryEmail;
    }

    public String getAdminEmail() {
        return adminEmail;
    }

    public void setAdminEmail(String adminEmail) {
        this.adminEmail = adminEmail;
    }

    public String getAdminId() {
        return adminId;
    }

    public void setAdminId(String adminId) {
        this.adminId = adminId;
    }
}