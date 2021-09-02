package pl.mtsolutions.tankup.controller;

import org.springframework.web.bind.annotation.*;
import pl.mtsolutions.tankup.model.User;
import pl.mtsolutions.tankup.pojo.UserBalanceResponse;
import pl.mtsolutions.tankup.pojo.UserRequest;
import pl.mtsolutions.tankup.service.UserBalanceService;
import pl.mtsolutions.tankup.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final UserBalanceService userBalanceService;

    public UserController(UserService userService, UserBalanceService userBalanceService) {
        this.userService = userService;
        this.userBalanceService = userBalanceService;
    }

    @PostMapping
    public User createUser(@RequestBody UserRequest userRequest) {
        return this.userService.createUser(userRequest);
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return this.userService.getAllUsers();
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {
        this.userService.deleteUser(id);
    }

    @GetMapping("{userId}/balance")
    public UserBalanceResponse getUserBalance(@PathVariable String userId) {
        return this.userBalanceService.getUserBalance(userId);
    }
}
