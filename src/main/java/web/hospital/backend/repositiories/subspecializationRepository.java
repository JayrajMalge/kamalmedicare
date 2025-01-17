
package web.hospital.backend.repositiories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import web.hospital.backend.enities.Subspeacialization;

@Repository
public interface subspecializationRepository extends JpaRepository<Subspeacialization,Integer>{
    
}
