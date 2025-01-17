
package web.hospital.backend.controllers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;



import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import java.security.SecureRandom;
import java.util.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.view.RedirectView;
import web.hospital.backend.MailService;
import web.hospital.backend.OTPServices;
import web.hospital.backend.enities.Doctor;
import web.hospital.backend.enities.Education;
import web.hospital.backend.enities.Experience;
import web.hospital.backend.enities.Speacialization;
import web.hospital.backend.enities.Subspeacialization;
import web.hospital.backend.enities.Subspeacializationimagesvideo;
import web.hospital.backend.enities.User;
import web.hospital.backend.repositiories.doctorRepository;
import web.hospital.backend.repositiories.educationRespository;
import web.hospital.backend.repositiories.experienceRespository;
import web.hospital.backend.repositiories.specializationRepository;
import web.hospital.backend.repositiories.subspecializationRepository;
import web.hospital.backend.repositiories.subspecializationimavideoRepository;
import web.hospital.backend.repositiories.userRepository;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
public class mainController {
    @Autowired
    private userRepository users; 
    
    @Autowired
    private MailService emailService;
    
    @Autowired
    private OTPServices otpservices;
    
    @Autowired
    private doctorRepository doctors;
    
    @Autowired
    private experienceRespository experiences;
    
    @Autowired
    private educationRespository educations;
    
    @Autowired
    private specializationRepository speacializations;
    
    @Autowired
    private subspecializationRepository subspeacializations;
    
    @Autowired
    private subspecializationimavideoRepository subspecializationimavideos;
    
    @GetMapping("/index")
    public String indexfile(){
        return "index";
    }
    
    @GetMapping("/login/auth")
    public RedirectView view(Model model, @AuthenticationPrincipal OAuth2User principal,HttpServletResponse response) {
        if (principal != null) {
            String user = new String();
            String email = principal.getAttribute("email");
            //System.out.println(email);
            model.addAttribute("email", email); 
            Cookie cookie = new Cookie("kamal_medicare", email);
            cookie.setSecure(true); 
            cookie.setPath("/");
            cookie.setMaxAge(7 * 24 * 60 * 60);
            response.addCookie(cookie);
            RedirectView redirectView = new RedirectView();
            redirectView.setUrl("http://localhost:4200/main");
            return redirectView;
        }
         return null;
        
    }
    
    @GetMapping("/")
    public String redirect(){
        return "index";
    }
    
    @GetMapping("/getuser")
    public User getusers(){
       return users.findByUsername("jayrajmalge");
    } 
    
    @GetMapping("/sendOTPtoemail/{email}")
    public ResponseEntity<Boolean> SendOTP(@PathVariable("email") String email){
        SecureRandom random = new SecureRandom();
        int otp = 100000 + random.nextInt(900000);
        emailService.sendEmail(email, "OTP From Kamal Medicare Hospital ", otp+" don't share this OTP");
        String OTP =Integer.toString(otp);
        //redisTemplate.opsForValue().set(email, OTP, Duration.ofMinutes(5));
        otpservices.generateOtp(email, OTP);
        System.out.println(email+OTP);
        return ResponseEntity.ok(true);        
    } 
    
        @PostMapping( "/emailverfication")
        public ResponseEntity<Boolean> verfity(@RequestParam String email,@RequestParam String otp, HttpServletResponse response)
        {
           String storedOtp = "";
           if(otpservices.verifyOtp(otp, email)){
                User olduser = users.findByEmail(otp);
                if(olduser==null){
                    Cookie cookie = new Cookie("kamal_medicare", otp);
                    cookie.setSecure(false); 
                    cookie.setHttpOnly(true);
                    cookie.setPath("/");
                    cookie.setMaxAge(7 * 24 * 60 * 60);
                    response.addCookie(cookie);
                }else{
                    User newuser = new User();
                    newuser.setEmail(otp);
                    newuser.setRole("User");
                    System.out.println(otp);
                    String[] usernames = otp.split("@");
                    newuser.setUsername(usernames[0]);
                    Cookie cookie = new Cookie("kamal_medicare", otp);
                    cookie.setSecure(false); 
                    cookie.setHttpOnly(true);
                    cookie.setPath("/");
                    cookie.setMaxAge(7 * 24 * 60 * 60);
                    response.addCookie(cookie);
                }
                return ResponseEntity.ok(true);
           }
           return ResponseEntity.ok(false);
        }
        
    @GetMapping("/getbyemail/{email}")
    public User getbyemail(@PathVariable("email") String email){
       return users.findByEmail(email);
    } 
    
    @PostMapping("/savedoctor")
    public Doctor savedoctor(@RequestBody Doctor doctor){
        byte[] imagbytes = doctor.getProfilephotot();
        doctor.setProfilephotot(imagbytes);
        Doctor doc = doctors.save(doctor);
        return doc;
    } 
    
    @PostMapping("/saveexperience")
    public Experience saveexperience(@RequestBody Experience experience){
        Experience exp = experiences.save(experience);
        return exp;
    } 
    
    @PostMapping("/saveeducation")
    public Education saveeducation(@RequestBody Education education){
        Education edu = educations.save(education);
        return edu;
    } 
    
     @PostMapping("/savespeacialization")
    public Speacialization savespeacialization(@RequestBody Speacialization specialization){
        Speacialization spe = speacializations.save(specialization);
        return spe;
    } 
    
     @PostMapping("/savesubspeacialization")
    public Subspeacialization savesubspeacialization(@RequestBody Subspeacialization education){
        Subspeacialization subspe = subspeacializations.save(education);
        return subspe;
    } 
    
    @PostMapping("/savesubspeacializationimgvid")
    public Subspeacializationimagesvideo savesubspeacializationimgvideo(@RequestBody Subspeacializationimagesvideo subspeacializationimagesvideo){
        Subspeacializationimagesvideo subspeimgvid = subspecializationimavideos.save(subspeacializationimagesvideo);
        return subspeimgvid;
    } 
    
}
