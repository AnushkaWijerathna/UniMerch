package com.vau.UniMerch.UniMerch.service;

import com.vau.UniMerch.UniMerch.model.Order;
import com.vau.UniMerch.UniMerch.model.OrderStatus;
import com.vau.UniMerch.UniMerch.model.Product;
import com.vau.UniMerch.UniMerch.repository.OrderRepository;
import com.vau.UniMerch.UniMerch.repository.ProductRepository;
import com.vau.UniMerch.UniMerch.service.QRService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.time.LocalDateTime;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepo;
    @Autowired
    private ProductRepository productRepo;
    @Autowired
    private QRService qrService;

    public Order createOrder(Order order) {
        double total = 0;

        for (Order.OrderItem item : order.getItems()) {
            Product prd = productRepo.findById(item.getProductId()).orElse(null);

            if (prd != null) {
                item.setProductName(prd.getName());
                item.setPriceAtPurchase(prd.getPrice());


                // Size validation only

                if (!prd.getVariants().contains(item.getSize())) {
                    throw new RuntimeException("Invalid size selected");
                }

                // Save the product with updated stock
                productRepo.save(prd);

                // Calculate the running total
                total += item.getQuantity() * item.getPriceAtPurchase();
            }
        }

        order.setTotalAmount(total);
        order.setStatus(OrderStatus.PENDING);
        order.setCreatedAt(LocalDateTime.now());

        //  Save the order first to get the ID
        Order savedOrder = orderRepo.save(order);

        // Generate the QR using that ID
        String qr = qrService.generateQRCode(savedOrder.getId());
        savedOrder.setQrCode(qr);

        //  Save AGAIN to store the QR code in the database
        return orderRepo.save(savedOrder);
    }

    public List<Order> getByClub(String clubId) {
    return orderRepo.findByClubId(clubId);
}
}