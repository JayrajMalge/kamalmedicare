
package web.hospital.backend;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Service;

@Service
public class OTPServices {
    private final Map<String, OtpDetails> otpStore = new ConcurrentHashMap<>();
    private static final int OTP_VALID_DURATION = 5;

    public String generateOtp(String username,String otp) {
        OtpDetails otpDetails = new OtpDetails(otp, LocalDateTime.now());
        otpStore.put(username, otpDetails); 
        return otp;
    }

    public boolean verifyOtp(String username, String otp) {
        OtpDetails otpDetails = otpStore.get(username);
        if (otpDetails == null) {
            return false;
        }

        boolean isValid = otpDetails.getOtp().equals(otp) &&
                otpDetails.getGeneratedAt().plusMinutes(OTP_VALID_DURATION).isAfter(LocalDateTime.now());

        if (isValid) {
            otpStore.remove(username); 
        }
        return isValid;
    }

    private static class OtpDetails {
        private final String otp;
        private final LocalDateTime generatedAt;

        public OtpDetails(String otp, LocalDateTime generatedAt) {
            this.otp = otp;
            this.generatedAt = generatedAt;
        }

        public String getOtp() {
            return otp;
        }

        public LocalDateTime getGeneratedAt() {
            return generatedAt;
        }
    }
}
