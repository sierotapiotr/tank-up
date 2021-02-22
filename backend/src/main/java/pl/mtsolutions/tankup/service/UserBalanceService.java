package pl.mtsolutions.tankup.service;

import org.springframework.stereotype.Service;
import pl.mtsolutions.tankup.model.Refuelling;
import pl.mtsolutions.tankup.model.Ride;
import pl.mtsolutions.tankup.pojo.Car;
import pl.mtsolutions.tankup.pojo.CarBalanceResponse;
import pl.mtsolutions.tankup.pojo.UserBalanceResponse;
import pl.mtsolutions.tankup.repository.RefuellingRepository;
import pl.mtsolutions.tankup.repository.RideRepository;

import java.math.BigDecimal;
import java.util.List;

import static java.util.Arrays.stream;
import static java.util.stream.Collectors.toList;

@Service
public class UserBalanceService {

    private final RefuellingRepository refuellingRepository;
    private final RideRepository rideRepository;

    public UserBalanceService(RefuellingRepository refuellingRepository, RideRepository rideRepository) {
        this.refuellingRepository = refuellingRepository;
        this.rideRepository = rideRepository;
    }


    public UserBalanceResponse getUserBalance(String userId) {
        var carBalances = stream(Car.values()).map(car -> getUserBalanceForCar(car, userId)).collect(toList());
        var totalBalance = carBalances.stream()
                .map(carBalance -> carBalance.getTankedFuelCost().subtract(carBalance.getSpentFuelCost()))
                .reduce(BigDecimal::add)
                .orElse(BigDecimal.ZERO);
        return UserBalanceResponse.builder()
                .totalBalance(totalBalance)
                .carBalances(carBalances)
                .build();
    }

    private CarBalanceResponse getUserBalanceForCar(Car car, String userId) {
        var carRides = rideRepository.findAllByCar(car);
        var carRefuellings = refuellingRepository.findAllByCar(car);
        var carKilometerCost = getKilometerCost(carRefuellings, carRides);
        var userCarRides = carRides.stream().filter(ride -> ride.getPassengerIds().contains(userId)).collect(toList());
        var userCarRefuellings = carRefuellings.stream().filter(refuelling -> refuelling.getUserId().equals(userId)).collect(toList());
        return CarBalanceResponse.builder()
                .car(car)
                .tankedFuelCost(getTankedFuelCost(userCarRefuellings))
                .spentFuelCost(getSpentFuelCost(userCarRides, carKilometerCost))
                .build();
    }

    private BigDecimal getSpentFuelCost(List<Ride> rides, BigDecimal kilometerCost) {
        var kilometres = rides.stream().map(Ride::getDistance).reduce(Integer::sum).orElse(0);
        return kilometerCost.multiply(BigDecimal.valueOf(kilometres));
    }

    private BigDecimal getKilometerCost(List<Refuelling> refuellings, List<Ride> rides) {
        var tankedFuelCost = getTankedFuelCost(refuellings);
        var drivenDistance = BigDecimal.valueOf(rides.stream()
                .map(Ride::getDistance)
                .reduce(0, Integer::sum));
        return tankedFuelCost.divide(drivenDistance);
    }

    private BigDecimal getTankedFuelCost(List<Refuelling> refuellings) {
        return refuellings.stream()
                .map(Refuelling::getPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

}
