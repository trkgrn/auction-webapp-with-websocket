package com.trkgrn.auctionbackend.api.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class Bid {

    @Column(name = "bid_id")
    private String bidId;

    @Column(name = "bid_username")
    private String bidderUsername;

    @Column(name = "bid_price")
    private Double bidPrice;

    @Column(name = "bid_date")
    private String bidDate;

}
