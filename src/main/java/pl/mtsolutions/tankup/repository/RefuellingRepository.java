package pl.mtsolutions.tankup.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.mtsolutions.tankup.model.Refuelling;

@Repository
public interface RefuellingRepository extends MongoRepository<Refuelling, String> {



}
