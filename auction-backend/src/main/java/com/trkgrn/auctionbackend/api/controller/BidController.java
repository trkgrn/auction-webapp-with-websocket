package com.trkgrn.auctionbackend.api.controller;

import com.trkgrn.auctionbackend.api.model.entity.Bid;
import com.trkgrn.auctionbackend.api.model.entity.Product;
import com.trkgrn.auctionbackend.api.service.ProductService;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.UUID;

@RestController
public class BidController {

    private final ProductService productService;
    private final SimpMessagingTemplate messagingTemplate;

    public BidController(ProductService productService, SimpMessagingTemplate messagingTemplate) {
        this.productService = productService;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/bid/{productId}")
    public void addBid(@DestinationVariable(value = "productId") Long productId, Bid bid) {
        bid.setBidId(UUID.randomUUID().toString());
        System.out.println("handledBid: " + productId + " bid:" + bid);
        Optional<Product> savedProduct = productService.addBidByProductId(productId, bid);
        if (savedProduct.isEmpty()) {
            return;
        }
        messagingTemplate.convertAndSend("/topic/products/" + productId, savedProduct.get());
    }
}
