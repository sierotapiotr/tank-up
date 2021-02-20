package pl.mtsolutions.tankup.pojo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
public class RefuellingRequest {

    private String userId;
    private BigDecimal price;
    private FuelType fuelType;
}
