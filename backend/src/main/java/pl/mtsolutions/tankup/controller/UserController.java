package pl.mtsolutions.tankup.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.mtsolutions.tankup.pojo.UserBalanceResponse;
import pl.mtsolutions.tankup.service.UserBalanceService;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserBalanceService userBalanceService;

    public UserController(UserBalanceService userBalanceService) {
        this.userBalanceService = userBalanceService;
    }


    @GetMapping("{userId}/balance")
    public UserBalanceResponse getUserBalance(@PathVariable String userId) {
        return this.userBalanceService.getUserBalance(userId);
    }
}
