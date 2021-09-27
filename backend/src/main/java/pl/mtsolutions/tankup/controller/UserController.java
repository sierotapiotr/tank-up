package pl.mtsolutions.tankup.controller;

import org.springframework.web.bind.annotation.*;
import pl.mtsolutions.tankup.model.User;
import pl.mtsolutions.tankup.pojo.UserBalanceResponse;
import pl.mtsolutions.tankup.pojo.UserRequest;
import pl.mtsolutions.tankup.service.UserBalanceService;
import pl.mtsolutions.tankup.service.UserService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

import static java.lang.Integer.MAX_VALUE;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final UserBalanceService userBalanceService;

    private final static String CURRENT_USER_COOKIE_NAME = "userId";


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
    public UserBalanceResponse getBalance(@PathVariable String userId) {
        return this.userBalanceService.getUserBalance(userId);
    }

    @PostMapping("/setCurrentUser")
    public void setCurrentUserCookie(@RequestBody String userId, HttpServletResponse response) {
        Cookie user_cookie = new Cookie(CURRENT_USER_COOKIE_NAME, userId);
        user_cookie.setPath("/");
        user_cookie.setMaxAge(MAX_VALUE);
        response.addCookie(user_cookie);
    }
}
