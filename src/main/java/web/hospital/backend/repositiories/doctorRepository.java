
package web.hospital.backend.repositiories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import web.hospital.backend.enities.Doctor;

@Repository
public interface doctorRepository extends JpaRepository<Doctor,Integer>{
 
    
}
