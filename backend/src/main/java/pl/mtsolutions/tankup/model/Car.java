package pl.mtsolutions.tankup.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import pl.mtsolutions.tankup.pojo.CarStatus;

@Data
@Builder
@AllArgsConstructor
@Document(collection = "cars")
public class Car {

    @Id
    private String id;
    private String name;
    private CarStatus status;

}
