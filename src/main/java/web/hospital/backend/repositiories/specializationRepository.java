
package web.hospital.backend.repositiories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import web.hospital.backend.enities.Speacialization;

@Repository
public interface specializationRepository extends JpaRepository<Speacialization,Integer>{
    
}
