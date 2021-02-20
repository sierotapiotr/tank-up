package pl.mtsolutions.tankup;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.mtsolutions.tankup.pojo.RefuellingRequestResponse;

@RestController
@RequestMapping("/refuelling")
public class RefuellingController {

    @PostMapping("/new")
    public RefuellingRequestResponse hello(@RequestBody RefuellingRequestResponse refuellingRequest) {
        return refuellingRequest;
    }

}
