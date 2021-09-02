package pl.mtsolutions.tankup.service;

import org.springframework.stereotype.Service;
import pl.mtsolutions.tankup.model.User;
import pl.mtsolutions.tankup.pojo.UserRequest;
import pl.mtsolutions.tankup.repository.UserRepository;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(UserRequest userRequest) {
        var user = User.builder()
                .name(userRequest.getName())
                .build();
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}
