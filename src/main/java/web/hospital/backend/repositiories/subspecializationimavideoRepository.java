
package web.hospital.backend.repositiories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import web.hospital.backend.enities.Subspeacializationimagesvideo;

@Repository
public interface subspecializationimavideoRepository extends JpaRepository<Subspeacializationimagesvideo,Integer> {
    
}
