package com.trkgrn.auctionbackend.api.model.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AddProductRequest {
    private String productName;
    private String description;
    private Double startPrice;
}
