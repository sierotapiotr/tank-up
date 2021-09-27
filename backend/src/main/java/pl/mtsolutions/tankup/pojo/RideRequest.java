package pl.mtsolutions.tankup.pojo;

import lombok.Data;
import pl.mtsolutions.tankup.model.Car;

import java.time.LocalDate;
import java.util.List;

@Data
public class RideRequest {

    private double distance;
    private String userId;
    private LocalDate date;
    private List<String> passengerIds;
    private String carId;

}
