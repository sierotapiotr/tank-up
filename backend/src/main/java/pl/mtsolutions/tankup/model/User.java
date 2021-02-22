package pl.mtsolutions.tankup.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "refuellings")
@NoArgsConstructor
public class User {

    @Id
    private String id;

}
