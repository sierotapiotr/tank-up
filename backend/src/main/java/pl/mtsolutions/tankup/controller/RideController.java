package pl.mtsolutions.tankup.controller;

import org.springframework.web.bind.annotation.*;
import pl.mtsolutions.tankup.model.Ride;
import pl.mtsolutions.tankup.pojo.RideRequest;
import pl.mtsolutions.tankup.repository.RideRepository;

import java.util.List;

import static java.time.LocalDateTime.now;

@RestController
@RequestMapping("/ride")
public class RideController {

    private final RideRepository rideRepository;


    public RideController(RideRepository rideRepository) {
        this.rideRepository = rideRepository;
    }

    @PostMapping
    public Ride createRide(@RequestBody RideRequest rideRequest) {
        Ride ride = new Ride();
        ride.setUserId(rideRequest.getUserId());
        ride.setPassengerIds(rideRequest.getPassengerIds());
        ride.setCarId(rideRequest.getCarId());
        ride.setDistance(rideRequest.getDistance());
        ride.setDate(now());
        return rideRepository.save(ride);
    }

    @GetMapping("/{userId}")
    public List<Ride> getUserRides(@PathVariable String userId) {
        return rideRepository.findAllByPassengerIdsContaining(userId);
    }


}
