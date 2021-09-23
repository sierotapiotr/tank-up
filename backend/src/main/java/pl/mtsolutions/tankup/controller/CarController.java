package pl.mtsolutions.tankup.controller;

import org.springframework.web.bind.annotation.*;
import pl.mtsolutions.tankup.model.Car;
import pl.mtsolutions.tankup.repository.CarRepository;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

import static java.lang.Integer.MAX_VALUE;
import static pl.mtsolutions.tankup.pojo.CarStatus.ACTIVE;
import static pl.mtsolutions.tankup.pojo.CarStatus.DELETED;

@RestController
@RequestMapping("/car")
public class CarController {

    private final CarRepository carRepository;

    private final static String CURRENT_CAR_COOKIE_NAME = "carId";

    public CarController(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    @PostMapping
    public Car createCar(@RequestBody String name) {
        var car = Car.builder()
                .name(name)
                .status(ACTIVE)
                .build();
        return carRepository.save(car);
    }

    @GetMapping("/all")
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteCar(@PathVariable String id) {
        var car = carRepository.fetchById(id);
        car.setStatus(DELETED);
    }

    @PostMapping("/setCurrentCar")
    public void setCurrentCarCookie(@RequestBody String carId, HttpServletResponse response) {
        Cookie user_cookie = new Cookie(CURRENT_CAR_COOKIE_NAME, carId);
        user_cookie.setPath("/");
        user_cookie.setMaxAge(MAX_VALUE);
        response.addCookie(user_cookie);
    }
}
