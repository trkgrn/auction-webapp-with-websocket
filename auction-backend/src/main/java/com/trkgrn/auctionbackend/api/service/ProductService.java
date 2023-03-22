package com.trkgrn.auctionbackend.api.service;

import com.trkgrn.auctionbackend.api.model.entity.Bid;
import com.trkgrn.auctionbackend.api.model.entity.Product;
import com.trkgrn.auctionbackend.api.repository.ProductRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll(Sort.by(Sort.Direction.ASC, "productId"));
    }

    public Optional<Product> saveProduct(Product product) {
        return Optional.of(productRepository.save(product));
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Optional<Product> addBidByProductId(Long productId, Bid bid) {
        Optional<Product> productOptional = getProductById(productId);
        if (productOptional.isEmpty() || productOptional.get().getCurrentPrice() >= bid.getBidPrice()) {
            return Optional.empty();
        }
        Product product = productOptional.get();
        product.getBids().add(bid);
        product.setCurrentPrice(bid.getBidPrice());
        return Optional.of(productRepository.save(product));
    }


}
