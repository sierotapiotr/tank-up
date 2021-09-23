package pl.mtsolutions.tankup.pojo;

import lombok.Builder;
import lombok.Data;
import pl.mtsolutions.tankup.model.Car;

import java.math.BigDecimal;

@Builder
@Data
public class CarBalanceResponse {

    private String carId;
    private BigDecimal tankedFuelCost;
    private BigDecimal spentFuelCost;

}
