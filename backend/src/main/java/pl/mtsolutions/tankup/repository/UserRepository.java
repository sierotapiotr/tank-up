package pl.mtsolutions.tankup.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.mtsolutions.tankup.model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

}
