package pl.mtsolutions.tankup.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.mtsolutions.tankup.model.Car;

@Repository
public interface CarRepository extends MongoRepository<Car, String> {

    default Car fetchById(String id) {
        return findById(id).orElseThrow(() -> new RuntimeException("Can not find car with id=" + id));
    }
}
