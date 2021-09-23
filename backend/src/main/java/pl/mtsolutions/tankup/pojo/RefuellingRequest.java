package pl.mtsolutions.tankup.pojo;

import lombok.Data;
import pl.mtsolutions.tankup.model.Car;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class RefuellingRequest {

    private String userId;
    private LocalDate date;
    private BigDecimal price;
    private FuelType fuelType;
    private String carId;
}
