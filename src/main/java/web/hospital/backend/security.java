
package web.hospital.backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class security {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception
    {
        http
               .authorizeHttpRequests(registry ->{
                  registry.requestMatchers("/index","/getuser","/sendOTPtoemail/{email}","/emailverfication","/getbyemail/{email}","/savedoctor","/saveeducation","/saveexperience","/savespeacialization","/savesubspeacializationimgvid","/savesubspeacialization").permitAll();
                  registry.anyRequest().authenticated();
               })
               .oauth2Login(oauth2Login->{
                    oauth2Login
                            .defaultSuccessUrl("http://localhost:5000/login/auth");
                })
               .formLogin(Customizer.withDefaults())
               .csrf().disable();
              return http.build();
    }
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:4200/")  // Angular frontend origin
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
