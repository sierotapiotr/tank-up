package pl.mtsolutions.tankup.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.mtsolutions.tankup.model.Refuelling;
import pl.mtsolutions.tankup.model.Car;

import java.util.List;

@Repository
public interface RefuellingRepository extends MongoRepository<Refuelling, String> {

    List<Refuelling> findAllByUserId(String userId);

    List<Refuelling> findAllByCarId(String carId);
}
