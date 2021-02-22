package pl.mtsolutions.tankup.controller;

import org.springframework.web.bind.annotation.*;
import pl.mtsolutions.tankup.model.Refuelling;
import pl.mtsolutions.tankup.model.Ride;
import pl.mtsolutions.tankup.pojo.RideRequest;
import pl.mtsolutions.tankup.repository.RideRepository;

import java.util.List;

@RestController
@RequestMapping("/rides")
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
        ride.setCar(rideRequest.getCar());
        ride.setDistance(rideRequest.getDistance());
        return rideRepository.save(ride);
    }

    @GetMapping("/{userId}")
    public List<Ride> getUserRides(@PathVariable String userId) {
        return rideRepository.findAllByUserId(userId);
    }


}
