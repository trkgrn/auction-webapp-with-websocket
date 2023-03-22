package com.trkgrn.auctionbackend.api.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Table(schema = "public", name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "description")
    private String description;

    @Column(name = "start_price")
    private Double startPrice;

    @Column(name = "current_price")
    private Double currentPrice;

    @ElementCollection
    @CollectionTable(name = "bid", joinColumns = @JoinColumn(name = "product_id"))
    private List<Bid> bids;
}
