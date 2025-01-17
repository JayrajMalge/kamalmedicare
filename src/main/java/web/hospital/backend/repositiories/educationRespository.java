
package web.hospital.backend.repositiories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import web.hospital.backend.enities.Education;
import web.hospital.backend.enities.Experience;

@Repository
public interface educationRespository extends  JpaRepository<Education,Integer> {
    
}
