package pl.mtsolutions.tankup.pojo;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class RideRequest {

    private int distance;
    private String userId;
    private LocalDate date;
    private List<String> passengerIds;
    private Car car;

}
