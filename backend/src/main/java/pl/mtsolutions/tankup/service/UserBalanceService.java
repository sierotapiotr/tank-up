package pl.mtsolutions.tankup.service;

import org.springframework.stereotype.Service;
import pl.mtsolutions.tankup.model.Refuelling;
import pl.mtsolutions.tankup.model.Ride;
import pl.mtsolutions.tankup.pojo.CarBalanceResponse;
import pl.mtsolutions.tankup.pojo.UserBalanceResponse;
import pl.mtsolutions.tankup.repository.CarRepository;
import pl.mtsolutions.tankup.repository.RefuellingRepository;
import pl.mtsolutions.tankup.repository.RideRepository;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import static java.math.BigDecimal.ZERO;
import static java.math.BigDecimal.valueOf;
import static java.util.stream.Collectors.toList;

@Service
public class UserBalanceService {

    private final CarRepository carRepository;
    private final RefuellingRepository refuellingRepository;
    private final RideRepository rideRepository;

    public UserBalanceService(CarRepository carRepository, RefuellingRepository refuellingRepository, RideRepository rideRepository) {
        this.carRepository = carRepository;
        this.refuellingRepository = refuellingRepository;
        this.rideRepository = rideRepository;
    }


    public UserBalanceResponse getUserBalance(String userId) {
        var cars = carRepository.findAll();
        var carBalances = cars.stream().map(car -> getUserBalanceForCar(car.getId(), userId)).collect(toList());
        var totalBalance = carBalances.stream()
                .map(carBalance -> carBalance.getTankedFuelCost().subtract(carBalance.getSpentFuelCost()))
                .reduce(BigDecimal::add)
                .orElse(ZERO);
        return UserBalanceResponse.builder()
                .totalBalance(totalBalance)
                .carBalances(carBalances)
                .build();
    }

    private CarBalanceResponse getUserBalanceForCar(String carId, String userId) {
        var carRides = rideRepository.findAllByCarId(carId);
        var carRefuellings = refuellingRepository.findAllByCarId(carId);
        var carDrivenDistance = valueOf(getDrivenDistance(carRides));
        var carTankedFuelCost = getTankedFuelCost(carRefuellings);
        var carKilometerCost = getKilometerCost(carDrivenDistance, carTankedFuelCost);

        var userRides = carRides.stream().filter(ride -> ride.getPassengerIds().contains(userId)).collect(toList());
        var userRefuellings = carRefuellings.stream().filter(refuelling -> refuelling.getUserId().equals(userId)).collect(toList());
        var effectiveDrivenDistance = getEffectiveDrivenDistance(userRides);
        return CarBalanceResponse.builder()
                .carId(carId)
                .tankedFuelCost(getTankedFuelCost(userRefuellings))
                .spentFuelCost(getSpentFuelCost(valueOf(effectiveDrivenDistance), carKilometerCost))
                .drivenDistance(getDrivenDistance(userRides))
                .effectiveDrivenDistance(effectiveDrivenDistance)
                .carKilometerCost(carKilometerCost)
                .build();
    }

    private BigDecimal getTankedFuelCost(List<Refuelling> refuellings) {
        return refuellings.stream()
                .map(Refuelling::getPrice)
                .reduce(ZERO, BigDecimal::add);
    }

    private BigDecimal getSpentFuelCost(BigDecimal drivenDistance, BigDecimal kilometerCost) {
        return kilometerCost.multiply(drivenDistance);
    }

    private double getDrivenDistance(List<Ride> rides) {
        return rides.stream()
                .map(Ride::getDistance)
                .reduce(0.0, Double::sum);
    }

    private double getEffectiveDrivenDistance(List<Ride> rides) {
        return rides.stream()
                .map(ride -> ride.getDistance() / ride.getPassengerIds().size())
                .reduce(0.0, Double::sum);
    }

    private BigDecimal getKilometerCost(BigDecimal drivenDistance, BigDecimal tankedFuelCost) {
        if (tankedFuelCost.compareTo(ZERO) == 0 || drivenDistance.compareTo(ZERO) == 0) {
            return ZERO;
        }
        return tankedFuelCost.divide(drivenDistance, 4, RoundingMode.HALF_UP);
    }

}
