package pl.mtsolutions.tankup.controller;

import org.springframework.web.bind.annotation.*;
import pl.mtsolutions.tankup.model.Refuelling;
import pl.mtsolutions.tankup.pojo.RefuellingRequest;
import pl.mtsolutions.tankup.repository.RefuellingRepository;

import java.util.List;

@RestController
@RequestMapping("/refuelling")
public class RefuellingController {

    private final RefuellingRepository refuellingRepository;

    public RefuellingController(RefuellingRepository refuellingRepository) {
        this.refuellingRepository = refuellingRepository;
    }


    @PostMapping
    public Refuelling createRefuelling(@RequestBody RefuellingRequest refuellingRequest) {
        Refuelling refuelling = new Refuelling();
        refuelling.setUserId(refuellingRequest.getUserId());
        refuelling.setPrice(refuellingRequest.getPrice());
        refuelling.setFuelType(refuellingRequest.getFuelType());
        return refuellingRepository.save(refuelling);
    }

    @GetMapping("/{userId}")
    public List<Refuelling> getUserRefuellings(@PathVariable String userId) {
        return refuellingRepository.findAllByUserId(userId);
    }
}
