package pl.mtsolutions.tankup.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import pl.mtsolutions.tankup.pojo.FuelType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Document(collection = "refuellings")
@NoArgsConstructor
public class Refuelling {

    @Id
    private String id;
    private String userId;
    private LocalDateTime date;
    private BigDecimal price;
    private FuelType fuelType;
    private String carId;

}

