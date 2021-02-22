package pl.mtsolutions.tankup.pojo;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class UserBalanceResponse {

    private BigDecimal totalBalance;
    private List<CarBalanceResponse> carBalances;

}
