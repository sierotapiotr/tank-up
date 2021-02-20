package pl.mtsolutions.tankup.model;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import pl.mtsolutions.tankup.pojo.FuelType;

import java.math.BigDecimal;

@Data
@Document(collection = "refuellings")
@NoArgsConstructor
public class Refuelling {

    @Id
    private String id;
    private String userId;
    private BigDecimal price;
    private FuelType fuelType;

}

