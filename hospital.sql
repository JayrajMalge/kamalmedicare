/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE IF NOT EXISTS `appointment` (
  `appointmentid` int(11) NOT NULL AUTO_INCREMENT,
  `doctor` int(11) DEFAULT NULL,
  `appointmentdate` timestamp NULL DEFAULT current_timestamp(),
  `status` enum('Scheduled','Completed','Canceled') DEFAULT NULL,
  `user` int(10) DEFAULT NULL,
  PRIMARY KEY (`appointmentid`),
  KEY `appoinment_fk` (`doctor`),
  KEY `appointmentuser_fk` (`user`),
  CONSTRAINT `appoinment_fk` FOREIGN KEY (`doctor`) REFERENCES `doctor` (`doctorid`),
  CONSTRAINT `appointmentuser_fk` FOREIGN KEY (`user`) REFERENCES `user` (`userid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE IF NOT EXISTS `casestudies` (
  `casestudyid` int(11) NOT NULL AUTO_INCREMENT,
  `treatmentid` int(11) DEFAULT NULL,
  `title` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `result` text DEFAULT NULL,
  `dateofcase` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`casestudyid`),
  KEY `treatment_fk` (`treatmentid`),
  CONSTRAINT `treatment_fk` FOREIGN KEY (`treatmentid`) REFERENCES `treatment` (`treatmentid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE IF NOT EXISTS `casestudies_images` (
  `imgid` int(11) NOT NULL AUTO_INCREMENT,
  `image` longblob DEFAULT NULL,
  `casestudy` int(10) DEFAULT NULL,
  `imagename` text DEFAULT NULL,
  `imagetype` text DEFAULT NULL,
  PRIMARY KEY (`imgid`),
  KEY `case_imgfk` (`casestudy`),
  CONSTRAINT `case_imgfk` FOREIGN KEY (`casestudy`) REFERENCES `casestudies` (`casestudyid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE IF NOT EXISTS `disease` (
  `diseaseid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) DEFAULT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`diseaseid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE IF NOT EXISTS `diseaseimages` (
  `diseaseimageid` int(11) NOT NULL AUTO_INCREMENT,
  `image` blob DEFAULT NULL,
  `imagename` text DEFAULT NULL,
  `imagetype` varchar(12) DEFAULT NULL,
  `disease` int(10) DEFAULT NULL,
  PRIMARY KEY (`diseaseimageid`),
  KEY `disease` (`disease`),
  CONSTRAINT `disease` FOREIGN KEY (`disease`) REFERENCES `disease` (`diseaseid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE IF NOT EXISTS `doctor` (
  `doctorid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `email` varchar(22) DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `schedulefrom` varchar(10) DEFAULT NULL,
  `scheduleto` varchar(10) DEFAULT NULL,
  `joindate` timestamp NULL DEFAULT current_timestamp(),
  `resigndate` timestamp NULL DEFAULT current_timestamp(),
  `profilephotot` longblob DEFAULT NULL,
  `imagename` text DEFAULT NULL,
  `imagetype` text DEFAULT NULL,
  PRIMARY KEY (`doctorid`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE IF NOT EXISTS `doctor_speacialization` (
  `doctorspeacializationid` int(11) NOT NULL AUTO_INCREMENT,
  `doctor` int(10) DEFAULT NULL,
  `speacialization` int(10) DEFAULT NULL,
  PRIMARY KEY (`doctorspeacializationid`),
  KEY `doc_fk` (`doctor`),
  KEY `speacialization_fk` (`speacialization`),
  CONSTRAINT `doc_fk` FOREIGN KEY (`doctor`) REFERENCES `doctor` (`doctorid`) ON UPDATE CASCADE,
  CONSTRAINT `speacialization_fk` FOREIGN KEY (`speacialization`) REFERENCES `speacialization` (`speacializationid`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE IF NOT EXISTS `education` (
  `educationid` int(11) NOT NULL AUTO_INCREMENT,
  `degree` varchar(20) DEFAULT NULL,
  `universityname` varchar(25) DEFAULT NULL,
  `fromdate` date DEFAULT NULL,
  `todate` date DEFAULT NULL,
  `doctor` int(10) DEFAULT NULL,
  PRIMARY KEY (`educationid`),
  KEY `fk_doctorid` (`doctor`),
  CONSTRAINT `fk_doctorid` FOREIGN KEY (`doctor`) REFERENCES `doctor` (`doctorid`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE IF NOT EXISTS `experience` (
  `experienceid` int(11) NOT NULL AUTO_INCREMENT,
  `field` varchar(25) DEFAULT NULL,
  `hospitalname` varchar(22) DEFAULT NULL,
  `years` int(11) DEFAULT NULL,
  `fromdate` date DEFAULT NULL,
  `todate` date DEFAULT NULL,
  `doctor` int(10) DEFAULT NULL,
  PRIMARY KEY (`experienceid`),
  KEY `fk_docid` (`doctor`),
  CONSTRAINT `fk_docid` FOREIGN KEY (`doctor`) REFERENCES `doctor` (`doctorid`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE IF NOT EXISTS `facilites` (
  `facilitesid` int(11) NOT NULL AUTO_INCREMENT,
  `facilityname` varchar(20) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `availability` enum('yes','no') DEFAULT NULL,
  `facilitytype` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`facilitesid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE IF NOT EXISTS `facilites_images` (
  `imgid` int(11) NOT NULL AUTO_INCREMENT,
  `image` longblob DEFAULT NULL,
  `facility` int(10) DEFAULT NULL,
  `imagename` text DEFAULT NULL,
  `imagetype` text DEFAULT NULL,
  PRIMARY KEY (`imgid`),
  KEY `fac_fk` (`facility`),
  CONSTRAINT `fac_fk` FOREIGN KEY (`facility`) REFERENCES `facilites` (`facilitesid`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE IF NOT EXISTS `faquestion` (
  `faquestionid` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) DEFAULT NULL,
  `question` varchar(60) DEFAULT NULL,
  `answer` varchar(80) DEFAULT NULL,
  `creatat` timestamp NULL DEFAULT current_timestamp(),
  `answerat` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`faquestionid`),
  KEY `user_fk` (`user`),
  CONSTRAINT `user_fk` FOREIGN KEY (`user`) REFERENCES `user` (`userid`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE IF NOT EXISTS `hospital` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(20) DEFAULT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE IF NOT EXISTS `news` (
  `newsid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(15) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `newsdate` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`newsid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE IF NOT EXISTS `newsimage` (
  `newsid` int(11) DEFAULT NULL,
  `image` longblob DEFAULT NULL,
  `news` int(11) NOT NULL AUTO_INCREMENT,
  `imagename` text DEFAULT NULL,
  `imagetype` text DEFAULT NULL,
  PRIMARY KEY (`news`),
  KEY `img_fk` (`newsid`),
  CONSTRAINT `img_fk` FOREIGN KEY (`newsid`) REFERENCES `news` (`newsid`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE IF NOT EXISTS `page` (
  `pageid` int(11) NOT NULL AUTO_INCREMENT,
  `tittle` varchar(20) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `slug` varchar(15) DEFAULT NULL,
  `createat` timestamp NULL DEFAULT current_timestamp(),
  `updateat` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`pageid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE IF NOT EXISTS `patient` (
  `patientid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `age` int(4) DEFAULT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  `phoneno` int(10) DEFAULT NULL,
  `address` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`patientid`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE IF NOT EXISTS `review` (
  `reviewid` int(11) NOT NULL AUTO_INCREMENT,
  `reviewdescription` varchar(50) DEFAULT NULL,
  `patient` int(10) DEFAULT NULL,
  PRIMARY KEY (`reviewid`),
  KEY `patient_reviewfk` (`patient`),
  CONSTRAINT `patient_reviewfk` FOREIGN KEY (`patient`) REFERENCES `patient` (`patientid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE IF NOT EXISTS `section` (
  `sectionid` int(11) NOT NULL AUTO_INCREMENT,
  `heading` varchar(40) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `imgvid` longblob DEFAULT NULL,
  `imagename` text DEFAULT NULL,
  `imagetype` text DEFAULT NULL,
  PRIMARY KEY (`sectionid`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE IF NOT EXISTS `speacialization` (
  `speacializationid` int(11) NOT NULL AUTO_INCREMENT,
  `fieldname` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`speacializationid`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE IF NOT EXISTS `subspeacialization` (
  `subspeacializationid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `speacialization` int(10) DEFAULT NULL,
  PRIMARY KEY (`subspeacializationid`),
  KEY `subspeacialization_fk` (`speacialization`),
  CONSTRAINT `subspeacialization_fk` FOREIGN KEY (`speacialization`) REFERENCES `speacialization` (`speacializationid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE IF NOT EXISTS `subspeacializationimagesvideo` (
  `subspeacializationimagesid` int(11) NOT NULL AUTO_INCREMENT,
  `subspeacialization` int(10) DEFAULT NULL,
  `imagevideo` longblob DEFAULT NULL,
  `imagename` text DEFAULT NULL,
  `imagetype` text DEFAULT NULL,
  PRIMARY KEY (`subspeacializationimagesid`),
  KEY `subspeacializationimages_fk` (`subspeacialization`),
  CONSTRAINT `subspeacializationimages_fk` FOREIGN KEY (`subspeacialization`) REFERENCES `subspeacialization` (`subspeacializationid`)
) ENGINE=InnoDB AUTO_INCREMENT=315 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE IF NOT EXISTS `treatment` (
  `treatmentid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) DEFAULT NULL,
  `description` varchar(40) DEFAULT NULL,
  `doctor` int(11) DEFAULT NULL,
  `patient` int(10) DEFAULT NULL,
  `cost` int(11) DEFAULT NULL,
  `tratmentdate` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`treatmentid`),
  KEY `patienttreatments_fk` (`patient`),
  CONSTRAINT `patienttreatments_fk` FOREIGN KEY (`treatmentid`) REFERENCES `patient` (`patientid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE IF NOT EXISTS `user` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) DEFAULT NULL,
  `hashedpassword` varchar(30) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `role` enum('Admin','Visitor') DEFAULT NULL,
  `createat` timestamp NULL DEFAULT current_timestamp(),
  `updateat` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`userid`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
