package pl.mtsolutions.tankup.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "rides")
@NoArgsConstructor
public class Ride {

    @Id
    private String id;
    private String userId;
    private LocalDateTime date;
    private List<String> passengerIds;
    private double distance;
    private String carId;
}
