package pl.mtsolutions.tankup.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.mtsolutions.tankup.model.Ride;
import pl.mtsolutions.tankup.pojo.Car;

import java.util.List;

@Repository
public interface RideRepository extends MongoRepository<Ride, String> {

    List<Ride> findAllByPassengerIdsContaining(String passengerId);

    List<Ride> findAllByCar(Car car);

}
