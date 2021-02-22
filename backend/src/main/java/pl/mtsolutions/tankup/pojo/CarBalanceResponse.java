package pl.mtsolutions.tankup.pojo;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Builder
@Data
public class CarBalanceResponse {

    private Car car;
    private BigDecimal tankedFuelCost;
    private BigDecimal spentFuelCost;

}
