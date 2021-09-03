package pl.mtsolutions.tankup.model;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "users")
@NoArgsConstructor
public class User {

    @Id
    private String id;
    private String name;

    @Builder
    public User(String name) {
        this.name = name;
    }

}
